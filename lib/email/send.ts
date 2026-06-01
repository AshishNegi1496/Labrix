import nodemailer, { type Transporter } from "nodemailer";

export type EmailAttachment = Readonly<{
  content: string;
  contentType?: string;
  filename: string;
  size?: number;
}>;

type EmailTag = Readonly<{
  name: string;
  value: string;
}>;

type SendEmailInput = Readonly<{
  attachments?: ReadonlyArray<EmailAttachment>;
  html: string;
  replyTo?: string;
  subject: string;
  tags?: ReadonlyArray<EmailTag>;
  text: string;
  to: ReadonlyArray<string>;
}>;

class EmailConfigurationError extends Error {}

let cachedTransporter: Transporter | null = null;
const SMTP_UNAVAILABLE_ERROR_CODES = new Set([
  "ECONNECTION",
  "ECONNREFUSED",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "ESOCKET",
  "ETIMEDOUT",
]);

function normalizeEnvValue(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function getEnvValue(envNames: ReadonlyArray<string>) {
  for (const envName of envNames) {
    const value = normalizeEnvValue(process.env[envName]);

    if (value) {
      return value;
    }
  }

  return null;
}

function getConfiguredSenderEmail() {
  return getEnvValue([
    "CONTACT_FORM_FROM_EMAIL",
    "SMTP_FROM_EMAIL",
    "SMTP_USER",
    "SMTP_USERNAME",
    "ELASTIC_EMAIL_FROM_EMAIL",
    "ELASTIC_EMAIL_USERNAME",
    "ELASTIC_EMAIL_USER_NAME",
    "Elastic_Email_UserName",
  ]);
}

function getConfiguredSenderName() {
  return (
    getEnvValue([
      "CONTACT_FORM_FROM_NAME",
      "SMTP_FROM_NAME",
      "ELASTIC_EMAIL_FROM_NAME",
      "ELASTIC_EMAIL_USER_NAME_TITLE",
      "Elastic_Email_UserNameTitle",
    ]) || "ClinRT Website"
  );
}

function getSmtpHost() {
  return getEnvValue([
    "SMTP_HOST",
    "ELASTIC_EMAIL_HOST",
    "Elastic_Email_Host",
  ]);
}

function getSmtpUsername() {
  return getEnvValue([
    "SMTP_USERNAME",
    "SMTP_USER",
    "ELASTIC_EMAIL_USERNAME",
    "ELASTIC_EMAIL_USER_NAME",
    "Elastic_Email_UserName",
  ]);
}

function getSmtpPassword() {
  return getEnvValue([
    "SMTP_PASSWORD",
    "SMTP_PASS",
    "ELASTIC_EMAIL_PASSWORD",
    "Elastic_Email_Password",
  ]);
}

function getSmtpPort() {
  const value = getEnvValue([
    "SMTP_PORT",
    "ELASTIC_EMAIL_PORT",
    "Elastic_Email_Port",
  ]);

  if (!value) {
    return 587;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new EmailConfigurationError(
      "SMTP_PORT is invalid. Set a numeric SMTP port in your env file.",
    );
  }

  return parsed;
}

function getSmtpSecure(port: number) {
  const value = getEnvValue(["SMTP_SECURE", "ELASTIC_EMAIL_SECURE"]);

  if (!value) {
    return port === 465;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  throw new EmailConfigurationError(
    "SMTP_SECURE is invalid. Use 'true' or 'false' in your env file.",
  );
}

function getSmtpTimeout(
  envNames: ReadonlyArray<string>,
  fallback: number,
  label: string,
) {
  const value = getEnvValue(envNames);

  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new EmailConfigurationError(
      `${label} is invalid. Set a numeric timeout in milliseconds in your env file.`,
    );
  }

  return parsed;
}

function buildFromAddress() {
  const fromEmail = getConfiguredSenderEmail();

  if (!fromEmail) {
    throw new EmailConfigurationError(
      "The sender email is not configured. Set CONTACT_FORM_FROM_EMAIL or SMTP_FROM_EMAIL in your env file, then restart the server.",
    );
  }

  const fromName = getConfiguredSenderName();

  return fromName ? `${fromName} <${fromEmail}>` : fromEmail;
}

function buildTransporter() {
  const host = getSmtpHost();

  if (!host) {
    throw new EmailConfigurationError(
      "SMTP_HOST is not configured. Set SMTP_HOST or ELASTIC_EMAIL_HOST in your env file, then restart the server.",
    );
  }

  const user = getSmtpUsername();

  if (!user) {
    throw new EmailConfigurationError(
      "SMTP_USERNAME is not configured. Set SMTP_USERNAME or ELASTIC_EMAIL_USERNAME in your env file, then restart the server.",
    );
  }

  const pass = getSmtpPassword();

  if (!pass) {
    throw new EmailConfigurationError(
      "SMTP_PASSWORD is not configured. Set SMTP_PASSWORD or ELASTIC_EMAIL_PASSWORD in your env file, then restart the server.",
    );
  }

  const port = getSmtpPort();

  return nodemailer.createTransport({
    host,
    port,

    secure: getSmtpSecure(port),

    auth: {
      user,
      pass,
    },

    tls: {
      rejectUnauthorized: false,
    },

    connectionTimeout: getSmtpTimeout(
      ["SMTP_CONNECTION_TIMEOUT_MS"],
      10000,
      "SMTP_CONNECTION_TIMEOUT_MS",
    ),
    greetingTimeout: getSmtpTimeout(
      ["SMTP_GREETING_TIMEOUT_MS"],
      10000,
      "SMTP_GREETING_TIMEOUT_MS",
    ),
    socketTimeout: getSmtpTimeout(
      ["SMTP_SOCKET_TIMEOUT_MS"],
      20000,
      "SMTP_SOCKET_TIMEOUT_MS",
    ),
  });
}

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = buildTransporter();
  }

  return cachedTransporter;
}

function buildAttachments(attachments: ReadonlyArray<EmailAttachment> | undefined) {
  if (!attachments?.length) {
    return undefined;
  }

  return attachments.map((attachment) => ({
    content: Buffer.from(attachment.content, "base64"),
    contentType: attachment.contentType,
    filename: attachment.filename,
  }));
}

function buildHeaders(tags: ReadonlyArray<EmailTag> | undefined) {
  if (!tags?.length) {
    return undefined;
  }

  return Object.fromEntries(
    tags.map((tag) => [`X-Contact-${tag.name}`, tag.value]),
  );
}

export function isEmailConfigError(error: unknown): error is EmailConfigurationError {
  return error instanceof EmailConfigurationError;
}

export function isEmailTransportUnavailableError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const maybeCode =
    "code" in error && typeof error.code === "string" ? error.code : null;

  if (maybeCode && SMTP_UNAVAILABLE_ERROR_CODES.has(maybeCode)) {
    return true;
  }

  return /ECONNECTION|ECONNREFUSED|EHOSTUNREACH|ENETUNREACH|ESOCKET|ETIMEDOUT/iu.test(
    error.message,
  );
}

export async function sendEmail({
  attachments,
  html,
  replyTo,
  subject,
  tags,
  text,
  to,
}: SendEmailInput) {
  const transporter = getTransporter();

  await transporter.sendMail({
    attachments: buildAttachments(attachments),
    from: buildFromAddress(),
    headers: buildHeaders(tags),
    html,
    replyTo,
    subject,
    text,
    to: [...to],
  });
}
