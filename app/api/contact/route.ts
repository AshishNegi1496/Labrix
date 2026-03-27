import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "@/config/app-config";
import {
  contactDemoInterestOptions,
  contactDemoTimelineOptions,
  contactFileConstraints,
  contactFileMimeTypes,
  contactFormSuccessPath,
  contactTouchEnquiryTypeOptions,
  getBrochureBySlug,
  getBrochureSuccessPath,
  getContactFormHref,
  type ContactFormType,
} from "@/data";
import { sendEmail, type EmailAttachment } from "@/lib/email/resend";
import {
  sanitizeEmailValue,
  sanitizePhoneValue,
  sanitizeTextValue,
} from "@/lib/sanitize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_CONTACT_RECIPIENT = "enquiry@clinrtglobal.com";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const submissionRateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

const formLabels: Record<ContactFormType, string> = {
  demo: "Request a Demo",
  touch: "Get in Touch",
};

type ContactErrorCode =
  | "email_failed"
  | "email_unavailable"
  | "invalid_file"
  | "invalid_origin"
  | "invalid_submission"
  | "rate_limited";

class ContactSubmissionError extends Error {
  constructor(public readonly code: ContactErrorCode) {
    super(code);
  }
}

type ParsedSubmission = Readonly<{
  attachments: ReadonlyArray<EmailAttachment>;
  formId: ContactFormType;
  html: string;
  recipient: string;
  replyTo: string;
  subject: string;
  successPath: string;
  text: string;
}>;

type EmailField = Readonly<{
  label: string;
  value: string | undefined;
}>;

function getRecipientForForm(formId: ContactFormType) {
  return formId === "demo"
    ? process.env.CONTACT_FORM_DEMO_RECIPIENT?.trim() || DEFAULT_CONTACT_RECIPIENT
    : process.env.CONTACT_FORM_TOUCH_RECIPIENT?.trim() || DEFAULT_CONTACT_RECIPIENT;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;")
    .replace(/'/gu, "&#39;");
}

function formatHtmlValue(value: string) {
  return escapeHtml(value).replace(/\n/gu, "<br />");
}

function buildEmailContent(formId: ContactFormType, fields: ReadonlyArray<EmailField>) {
  const visibleFields = fields.filter((field) => field.value);
  const submittedAt = new Date().toISOString();
  const tableRows = visibleFields
    .map(
      (field) => `
        <tr>
          <td style="padding:12px 16px;border:1px solid #dbe4ee;background:#f8fafc;font-weight:600;color:#0f243a;vertical-align:top;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:12px 16px;border:1px solid #dbe4ee;color:#1f2937;vertical-align:top;">
            ${formatHtmlValue(field.value ?? "")}
          </td>
        </tr>`,
    )
    .join("");
  const text = [
    `${formLabels[formId]} submission`,
    `Submitted at: ${submittedAt}`,
    ...visibleFields.map((field) => `${field.label}: ${field.value}`),
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:24px;color:#0f243a;">
      <div style="margin:0 auto;max-width:760px;background:#ffffff;border:1px solid #dbe4ee;border-radius:20px;overflow:hidden;">
        <div style="padding:24px 28px;background:#0f243a;color:#ffffff;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.75;">ClinRT Website</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">${escapeHtml(formLabels[formId])}</h1>
          <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.76);">
            Submitted at ${escapeHtml(submittedAt)}.
          </p>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;">
            <tbody>${tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>`;

  return { html, text };
}

function getRequiredTextField(formData: FormData, name: string, maxLength: number) {
  const rawValue = formData.get(name);

  if (typeof rawValue !== "string") {
    throw new ContactSubmissionError("invalid_submission");
  }

  const value = sanitizeTextValue(rawValue).slice(0, maxLength);

  if (!value) {
    throw new ContactSubmissionError("invalid_submission");
  }

  return value;
}

function getOptionalTextField(formData: FormData, name: string, maxLength: number) {
  const rawValue = formData.get(name);

  if (typeof rawValue !== "string") {
    return undefined;
  }

  const value = sanitizeTextValue(rawValue).slice(0, maxLength);

  return value || undefined;
}

function getRequiredEmailField(formData: FormData, name: string) {
  const rawValue = formData.get(name);

  if (typeof rawValue !== "string") {
    throw new ContactSubmissionError("invalid_submission");
  }

  const value = sanitizeEmailValue(rawValue).slice(0, 254);

  if (!value || !EMAIL_PATTERN.test(value)) {
    throw new ContactSubmissionError("invalid_submission");
  }

  return value;
}

function getOptionalPhoneField(formData: FormData, name: string) {
  const rawValue = formData.get(name);

  if (typeof rawValue !== "string") {
    return undefined;
  }

  const value = sanitizePhoneValue(rawValue).slice(0, 20);

  return value || undefined;
}

function getRequiredPhoneField(formData: FormData, name: string) {
  const value = getOptionalPhoneField(formData, name);

  if (!value) {
    throw new ContactSubmissionError("invalid_submission");
  }

  return value;
}

function getRequiredChoice<T extends string>(
  formData: FormData,
  name: string,
  allowedValues: readonly T[],
) {
  const rawValue = formData.get(name);

  if (typeof rawValue !== "string") {
    throw new ContactSubmissionError("invalid_submission");
  }

  const value = sanitizeTextValue(rawValue) as T;

  if (!allowedValues.includes(value)) {
    throw new ContactSubmissionError("invalid_submission");
  }

  return value;
}

function getFormId(formData: FormData): ContactFormType {
  const rawValue = formData.get("contactFormId");

  if (rawValue === "demo" || rawValue === "touch") {
    return rawValue;
  }

  if (rawValue === "community") {
    return "touch";
  }

  return "demo";
}

function getBrochureSlug(formData: FormData) {
  return getOptionalTextField(formData, "brochureSlug", 120);
}

function getSuccessPath(brochureSlug?: string) {
  const brochure = brochureSlug ? getBrochureBySlug(brochureSlug) : null;

  if (brochure) {
    return getBrochureSuccessPath(brochure.slug);
  }

  return contactFormSuccessPath;
}

function getErrorPath(
  formId: ContactFormType,
  errorCode: ContactErrorCode,
  brochureSlug?: string,
) {
  const extraParams: Record<string, string> = {
    error: errorCode,
    status: "error",
  };

  const brochure = brochureSlug ? getBrochureBySlug(brochureSlug) : null;

  if (brochure) {
    extraParams.brochure = brochure.slug;
  }

  return getContactFormHref(formId, extraParams);
}

function buildRedirect(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url), 303);
}

function assertAllowedOrigin(request: NextRequest) {
  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = new URL(appConfig.siteUrl).origin;
  const originHeader = request.headers.get("origin");

  if (!originHeader) {
    return;
  }

  let origin: string;

  try {
    origin = new URL(originHeader).origin;
  } catch {
    throw new ContactSubmissionError("invalid_origin");
  }

  if (origin !== requestOrigin && origin !== configuredOrigin) {
    throw new ContactSubmissionError("invalid_origin");
  }
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function assertRateLimit(clientKey: string) {
  const now = Date.now();

  for (const [key, entry] of submissionRateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      submissionRateLimitStore.delete(key);
    }
  }

  const existingEntry = submissionRateLimitStore.get(clientKey);

  if (!existingEntry || existingEntry.resetAt <= now) {
    submissionRateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  if (existingEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new ContactSubmissionError("rate_limited");
  }

  existingEntry.count += 1;
  submissionRateLimitStore.set(clientKey, existingEntry);
}

async function getOptionalAttachment(formData: FormData) {
  const rawValue = formData.get("file");

  if (!(rawValue instanceof File) || rawValue.size === 0) {
    return undefined;
  }

  if (
    rawValue.size > contactFileConstraints.maxSizeBytes ||
    !contactFileMimeTypes.includes(rawValue.type as (typeof contactFileMimeTypes)[number])
  ) {
    throw new ContactSubmissionError("invalid_file");
  }

  const encodedContent = Buffer.from(await rawValue.arrayBuffer()).toString("base64");

  return {
    content: encodedContent,
    filename: rawValue.name,
  } satisfies EmailAttachment;
}

async function parseSubmission(formData: FormData): Promise<ParsedSubmission> {
  const formId = getFormId(formData);
  const sourcePage = getOptionalTextField(formData, "sourcePage", 120) || "Contact Page";
  const firstName = getRequiredTextField(formData, "firstName", 80);
  const lastName = getRequiredTextField(formData, "lastName", 80);
  const email = getRequiredEmailField(formData, "email");
  const brochureSlug = getBrochureSlug(formData);
  const brochure = brochureSlug ? getBrochureBySlug(brochureSlug) : null;
  const consentValue = formData.get("consent");

  if (consentValue !== "yes") {
    throw new ContactSubmissionError("invalid_submission");
  }

  if (formId === "demo") {
    const phone = getOptionalPhoneField(formData, "phone");
    const company = getRequiredTextField(formData, "company", 120);
    const designation = getRequiredTextField(formData, "designation", 120);
    const productInterest = getRequiredChoice(
      formData,
      "productInterest",
      contactDemoInterestOptions,
    );
    const timeline = getRequiredChoice(
      formData,
      "timeline",
      contactDemoTimelineOptions,
    );
    const message = getRequiredTextField(formData, "message", 1200);
    const content = buildEmailContent(formId, [
      { label: "Form", value: formLabels[formId] },
      { label: "Source page", value: sourcePage },
      { label: "First name", value: firstName },
      { label: "Last name", value: lastName },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Company", value: company },
      { label: "Role", value: designation },
      { label: "Primary interest", value: productInterest },
      { label: "Expected timeline", value: timeline },
      { label: "Consent", value: "Yes" },
      { label: "Message", value: message },
    ]);

    return {
      attachments: [],
      formId,
      html: content.html,
      recipient: getRecipientForForm(formId),
      replyTo: email,
      subject: `Request a Demo | ${firstName} ${lastName} | ${company}`,
      successPath: getSuccessPath(),
      text: content.text,
    };
  }

  const phone = getRequiredPhoneField(formData, "phone");
  const company = getRequiredTextField(formData, "company", 120);
  const designation = getOptionalTextField(formData, "designation", 120);
  const enquiryType = getRequiredChoice(
    formData,
    "enquiryType",
    contactTouchEnquiryTypeOptions,
  );
  const message = getRequiredTextField(formData, "message", 1200);
  const attachment = await getOptionalAttachment(formData);
  const brochureTitle = brochure?.title;
  const content = buildEmailContent(formId, [
    { label: "Form", value: brochureTitle ? "Get in Touch - Brochure Request" : formLabels[formId] },
    { label: "Source page", value: sourcePage },
    { label: "First name", value: firstName },
    { label: "Last name", value: lastName },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Company", value: company },
    { label: "Designation", value: designation },
    { label: "Enquiry type", value: enquiryType },
    { label: "Requested brochure", value: brochureTitle },
    { label: "Attachment", value: attachment?.filename },
    { label: "Consent", value: "Yes" },
    { label: "Message", value: message },
  ]);

  return {
    attachments: attachment ? [attachment] : [],
    formId,
    html: content.html,
    recipient: getRecipientForForm(formId),
    replyTo: email,
    subject: brochureTitle
      ? `Brochure Request | ${firstName} ${lastName} | ${brochureTitle}`
      : `Get in Touch | ${firstName} ${lastName} | ${company}`,
    successPath: getSuccessPath(brochure?.slug),
    text: content.text,
  };
}

export async function POST(request: NextRequest) {
  let formId: ContactFormType = "demo";
  let brochureSlug: string | undefined;

  try {
    assertAllowedOrigin(request);

    const formData = await request.formData();
    formId = getFormId(formData);
    brochureSlug = getBrochureSlug(formData);

    const honeyValue = formData.get("_honey");
    if (typeof honeyValue === "string" && sanitizeTextValue(honeyValue)) {
      return buildRedirect(request, getSuccessPath(brochureSlug));
    }

    assertRateLimit(getClientKey(request));

    const submission = await parseSubmission(formData);

    await sendEmail({
      attachments: submission.attachments,
      html: submission.html,
      replyTo: submission.replyTo,
      subject: submission.subject,
      tags: [
        { name: "form_id", value: submission.formId },
        { name: "source", value: "website" },
      ],
      text: submission.text,
      to: [submission.recipient],
    });

    return buildRedirect(request, submission.successPath);
  } catch (error) {
    const errorCode =
      error instanceof ContactSubmissionError
        ? error.code
        : error instanceof Error &&
            (/RESEND_API_KEY|CONTACT_FORM_FROM_EMAIL/).test(error.message)
          ? "email_unavailable"
          : "email_failed";

    console.error("Contact form submission failed", {
      brochureSlug,
      error,
      errorCode,
      formId,
    });

    return buildRedirect(request, getErrorPath(formId, errorCode, brochureSlug));
  }
}
