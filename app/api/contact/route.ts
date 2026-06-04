import { sendEmail } from "@/lib/email/send";

type ContactRouteType = "demo" | "touch";

const DEFAULT_GENERAL_RECIPIENT = "enquiry@clinrtglobal.com";

function normalizeValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function getEnvValue(envNames: ReadonlyArray<string>) {
  for (const envName of envNames) {
    const value = process.env[envName]?.trim();

    if (value) {
      return value;
    }
  }

  return null;
}

function parseRecipients(value: string | null) {
  return (
    value
      ?.split(",")
      .map((recipient) => recipient.trim())
      .filter(Boolean) ?? []
  );
}

function getMultiValue(body: FormData, key: string) {
  return body
    .getAll(key)
    .map((value) => normalizeValue(value))
    .filter(Boolean);
}

async function fileToAttachment(file: File) {
  return {
    content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    contentType: file.type || "application/octet-stream",
    filename: file.name || "upload",
    size: file.size,
  };
}

function resolveRecipients(routeType: ContactRouteType) {
  const routeSpecificRecipients = parseRecipients(
    getEnvValue(
      routeType === "demo"
        ? ["CONTACT_FORM_DEMO_RECIPIENTS", "CONTACT_FORM_DEMO_RECIPIENT"]
        : ["CONTACT_FORM_TOUCH_RECIPIENTS", "CONTACT_FORM_TOUCH_RECIPIENT"],
    ),
  );

  if (routeSpecificRecipients.length > 0) {
    return routeSpecificRecipients;
  }

  const sharedRecipients = parseRecipients(
    getEnvValue(["CONTACT_FORM_RECIPIENTS", "CONTACT_FORM_RECIPIENT"]),
  );

  if (sharedRecipients.length > 0) {
    return sharedRecipients;
  }

  return [DEFAULT_GENERAL_RECIPIENT];
}

export async function POST(req: Request) {
  try {
    console.log("ENV CHECK", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  passExists: !!process.env.SMTP_PASS,
});
    const body = await req.formData();
    const contactFormId = normalizeValue(body.get("contactFormId"));

const isTouchForm = contactFormId === "touch";
const isDemoForm = contactFormId === "demo";

const formLabel = isDemoForm
  ? "Request a Demo"
  : "Get in Touch";

const routeType: ContactRouteType = isDemoForm
  ? "demo"
  : "touch";
   
    const recipients = resolveRecipients(routeType);

    const firstName = normalizeValue(body.get("firstName"));
    const lastName = normalizeValue(body.get("lastName"));
    const email = normalizeValue(body.get("email"));
    const phone = normalizeValue(body.get("phone"));
    const company = normalizeValue(body.get("company"));
    const designation = normalizeValue(body.get("designation"));
    const enquiryType = normalizeValue(body.get("enquiryType"));
    const countryRegion = normalizeValue(body.get("countryRegion"));
    const timeline = normalizeValue(body.get("timeline"));
    const message = normalizeValue(body.get("message"));
    const sourceOfContact = normalizeValue(body.get("sourceOfContact"));
    const leadSource = normalizeValue(body.get("leadSource"));
    const sourcePage = normalizeValue(body.get("sourcePage"));
    const areasOfInterest = getMultiValue(body, "areasOfInterest");
    const attachmentValue = body.get("attachment");
    const attachment =
      attachmentValue instanceof File && attachmentValue.size > 0
        ? await fileToAttachment(attachmentValue)
        : null;
    const summaryRows: ReadonlyArray<readonly [string, string]> = isDemoForm
      ? [
          ["First Name", firstName],
          ["Last Name", lastName],
          ["Email Address", email],
          ["Phone Number", phone],
          ["Company", company],
          ["Role", designation],
          ["Country / Region", countryRegion],
          ["Expected Timeline", timeline],
          ["Lead Source", leadSource],
          ["Source Page", sourcePage],
        ]
      : isTouchForm
      ? [
          ["First Name", firstName],
          ["Last Name", lastName],
          ["Email Address", email],
          ["Phone Number", phone],
          ["Company Name", company],
          ["Designation", designation],
          ["Enquiry Type", enquiryType],
          ["Source of Contact", sourceOfContact],
          ["Uploaded File", attachment?.filename ?? "-"],
        ]
      : [
          ["First Name", firstName],
          ["Last Name", lastName],
          ["Email Address", email],
          ["Company Name", company],
          ["Designation / Role", designation],
          ["Areas of Interest", areasOfInterest.join(", ")],
          ["Country / Region", countryRegion],
        ];
   const htmlRows = summaryRows
  .map(
    ([label, value]) => `
      <tr>
        <td style="
          padding:16px 20px;
          width:220px;
          background:#fafbff;
          border-bottom:1px solid #e2e8f0;
          font-weight:600;
          color:#334155;
        ">
          ${escapeHtml(label)}
        </td>

        <td style="
          padding:16px 20px;
          border-bottom:1px solid #e2e8f0;
          color:#0f172a;
        ">
          ${escapeHtml(value || "-")}
        </td>
      </tr>
    `,
  )
  .join("");

    const messageSection = isDemoForm || isTouchForm
      ? `
        <div style="margin-top:32px;">
          <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f243a;">
            Your Message
          </p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;color:#475569;line-height:1.8;font-size:15px;white-space:pre-wrap;">
            ${escapeHtml(message || "-")}
          </div>
        </div>
      `
      : "";

    const htmlAttachmentSection = attachment
      ? `
        <div style="margin-top:32px;">
          <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f243a;">
            Uploaded File
          </p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;color:#475569;line-height:1.8;font-size:15px;white-space:pre-wrap;">
            ${escapeHtml(attachment.filename)}
          </div>
        </div>
      `
      : "";

    const html = `
<div style="margin:0;padding:40px 0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table width="700" cellpadding="0" cellspacing="0"
          style="
            background:#ffffff;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 8px 24px rgba(0,0,0,0.08);
          ">

          <!-- Header -->
          <tr>
            <td
              style="
                background:#6466ae;
                padding:36px 40px;
                color:#ffffff;
              "
            >
              <table width="100%">
                <tr>
                  <td>
                    <div style="
                      font-size:12px;
                      text-transform:uppercase;
                      letter-spacing:2px;
                      opacity:.9;
                    ">
                      ClinRT Global
                    </div>

                    <h1 style="
                      margin:10px 0 0;
                      font-size:28px;
                      font-weight:700;
                    ">
                      ${escapeHtml(formLabel)}
                    </h1>

                    <p style="
                      margin:10px 0 0;
                      font-size:15px;
                      line-height:1.6;
                      opacity:.9;
                    ">
                      A new submission has been received from the website.
                    </p>
                  </td>

                  <td align="right" valign="top">
                    <span style="
                      display:inline-block;
                      background:rgba(255,255,255,.18);
                      padding:8px 14px;
                      border-radius:999px;
                      font-size:12px;
                      font-weight:600;
                    ">
                      NEW LEAD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary -->
          <tr>
            <td style="padding:35px 40px 10px;">

              <div style="
                font-size:18px;
                font-weight:700;
                color:#1e293b;
                margin-bottom:20px;
              ">
                Contact Information
              </div>

              <table width="100%" cellpadding="0" cellspacing="0"
                style="
                  border:1px solid #e2e8f0;
                  border-radius:14px;
                  overflow:hidden;
                ">
                ${htmlRows}
              </table>

            </td>
          </tr>

          ${
            messageSection
              ? `
          <tr>
            <td style="padding:20px 40px 0;">
              <div style="
                border-left:4px solid #6466ae;
                background:#f8f9ff;
                padding:22px;
                border-radius:12px;
              ">
                <div style="
                  font-size:16px;
                  font-weight:700;
                  color:#1e293b;
                  margin-bottom:12px;
                ">
                  Message
                </div>

                <div style="
                  color:#475569;
                  line-height:1.8;
                  white-space:pre-wrap;
                  font-size:15px;
                ">
                  ${escapeHtml(message || "-")}
                </div>
              </div>
            </td>
          </tr>
          `
              : ""
          }

          ${
            attachment
              ? `
          <tr>
            <td style="padding:20px 40px 0;">
              <div style="
                background:#f8fafc;
                border:1px solid #e2e8f0;
                border-radius:12px;
                padding:18px;
              ">
                <div style="
                  font-size:14px;
                  font-weight:700;
                  color:#1e293b;
                  margin-bottom:6px;
                ">
                  Attachment
                </div>

                <div style="
                  color:#6466ae;
                  font-weight:600;
                ">
                  📎 ${escapeHtml(attachment.filename)}
                </div>
              </div>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Meta -->
          <tr>
            <td style="padding:30px 40px;">
              <table width="100%">
                <tr>
                  <td style="
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:12px;
                    padding:16px;
                  ">
                    <div style="
                      color:#64748b;
                      font-size:13px;
                    ">
                      Submitted At
                    </div>

                    <div style="
                      margin-top:4px;
                      font-size:14px;
                      font-weight:600;
                      color:#1e293b;
                    ">
                      ${new Date().toLocaleString()}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background:#f8fafc;
              border-top:1px solid #e2e8f0;
              padding:24px 40px;
            ">
              <div style="
                color:#64748b;
                font-size:13px;
                line-height:1.7;
              ">
                This email was automatically generated from the
                <strong>ClinRT Global Website Contact Form</strong>.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>
`;

    const text = [
      `ClinRT | ${formLabel} Received`,
      "",
      ...summaryRows.map(([label, value]) => `${label}: ${value || "-"}`),
      ...(isTouchForm
        ? ["", "Your Message", message || "-"]
        : []),
      ...(attachment ? ["", "Uploaded File", attachment.filename] : []),
    ].join("\n");

    await sendEmail({
      to: recipients,
      subject: `ClinRT | ${formLabel} Received`,
      html,
      text,
      attachments: attachment ? [attachment] : undefined,
      replyTo: email || undefined,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 },
    );
  }
}






