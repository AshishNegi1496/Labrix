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
    const isDemoRequest = contactFormId === "touch";
    const routeType: ContactRouteType = isDemoRequest ? "demo" : "touch";
    const formLabel = isDemoRequest ? "Demo Request" : "General Enquiry";
    const recipients = resolveRecipients(routeType);

    const firstName = normalizeValue(body.get("firstName"));
    const lastName = normalizeValue(body.get("lastName"));
    const email = normalizeValue(body.get("email"));
    const phone = normalizeValue(body.get("phone"));
    const company = normalizeValue(body.get("company"));
    const role = normalizeValue(body.get("role"));
    const primaryInterest = normalizeValue(body.get("primaryInterest"));
    const timeline = normalizeValue(body.get("timeline"));
    const requirements = normalizeValue(body.get("requirements"));

    const summaryRows: ReadonlyArray<readonly [string, string]> = [
      ["First Name", firstName],
      ["Last Name", lastName],
      ["Email Address", email],
      ["Phone Number", phone],
      ["Organization", company],
      ["Role / Position", role],
      ["Primary Interest", primaryInterest],
      ["Expected Timeline", timeline],
    ];

    const htmlRows = summaryRows
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;width:220px;font-weight:600;color:#0f243a;">
              ${escapeHtml(label)}
            </td>
            <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#475569;">
              ${escapeHtml(value || "-")}
            </td>
          </tr>
        `,
      )
      .join("");

    const html = `
      <div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">
              <table width="680" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e7eb;">
                <tr>
                  <td style="background:#0f243a;padding:32px 40px;color:#ffffff;">
                    <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.75;">
                      ClinRT Global
                    </p>
                    <h1 style="margin:12px 0 0;font-size:28px;font-weight:700;line-height:1.3;">
                      ${escapeHtml(formLabel)} Received
                    </h1>
                    <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.78);">
                      A new enquiry has been submitted through the ClinRT website contact portal.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:36px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                      ${htmlRows}
                    </table>

                    <div style="margin-top:32px;">
                      <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f243a;">
                        Project Requirements
                      </p>
                      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;color:#475569;line-height:1.8;font-size:15px;white-space:pre-wrap;">
                        ${escapeHtml(requirements || "-")}
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 40px;background:#f8fafc;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.7;">
                      This notification was automatically generated from the ClinRT Global website contact form.
                    </p>
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
      "",
      "Project Requirements",
      requirements || "-",
    ].join("\n");

    await sendEmail({
      to: recipients,
      subject: `ClinRT | ${formLabel} Received`,
      html,
      text,
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
