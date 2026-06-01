import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const envFileCandidates = [
  ".env.production.local",
  ".env.local",
  ".env.production",
  ".env",
];

function normalizeValue(value) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function stripMatchingQuotes(value) {
  if (value.length < 2) {
    return value;
  }

  const first = value[0];
  const last = value[value.length - 1];

  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return value.slice(1, -1);
  }

  return value;
}

function parseEnvFile(filePath) {
  const parsed = new Map();
  const raw = fs.readFileSync(filePath, "utf8");

  for (const line of raw.split(/\r?\n/u)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = stripMatchingQuotes(
      trimmedLine.slice(separatorIndex + 1).trim(),
    );

    if (key && !parsed.has(key)) {
      parsed.set(key, value);
    }
  }

  return parsed;
}

const fileBackedEnv = new Map();
const loadedFiles = [];

for (const candidate of envFileCandidates) {
  const filePath = path.join(cwd, candidate);

  if (!fs.existsSync(filePath)) {
    continue;
  }

  loadedFiles.push(candidate);

  for (const [key, value] of parseEnvFile(filePath)) {
    if (!fileBackedEnv.has(key)) {
      fileBackedEnv.set(key, value);
    }
  }
}

function getConfiguredEnv(envNames) {
  for (const envName of envNames) {
    const processValue = normalizeValue(process.env[envName]);

    if (processValue) {
      return { envName, source: "process.env" };
    }

    const fileValue = normalizeValue(fileBackedEnv.get(envName));

    if (fileValue) {
      return { envName, source: "env-file" };
    }
  }

  return null;
}

const requiredChecks = [
  {
    label: "Sender email",
    envNames: [
      "CONTACT_FORM_FROM_EMAIL",
      "SMTP_FROM_EMAIL",
      "SMTP_USER",
      "SMTP_USERNAME",
      "ELASTIC_EMAIL_FROM_EMAIL",
      "ELASTIC_EMAIL_USERNAME",
      "ELASTIC_EMAIL_USER_NAME",
      "Elastic_Email_UserName",
    ],
    help: "Set CONTACT_FORM_FROM_EMAIL, SMTP_FROM_EMAIL, SMTP_USER, or SMTP_USERNAME to a verified sender address.",
  },
  {
    label: "SMTP host",
    envNames: ["SMTP_HOST", "ELASTIC_EMAIL_HOST", "Elastic_Email_Host"],
    help: "Set SMTP_HOST or ELASTIC_EMAIL_HOST.",
  },
  {
    label: "SMTP username",
    envNames: [
      "SMTP_USERNAME",
      "SMTP_USER",
      "ELASTIC_EMAIL_USERNAME",
      "ELASTIC_EMAIL_USER_NAME",
      "Elastic_Email_UserName",
    ],
    help: "Set SMTP_USERNAME or ELASTIC_EMAIL_USERNAME.",
  },
  {
    label: "SMTP password",
    envNames: [
      "SMTP_PASSWORD",
      "SMTP_PASS",
      "ELASTIC_EMAIL_PASSWORD",
      "Elastic_Email_Password",
    ],
    help: "Set SMTP_PASSWORD, SMTP_PASS, or ELASTIC_EMAIL_PASSWORD.",
  },
];

const recipientChecks = [
  "CONTACT_FORM_RECIPIENTS",
  "CONTACT_FORM_RECIPIENT",
  "CONTACT_FORM_DEMO_RECIPIENTS",
  "CONTACT_FORM_DEMO_RECIPIENT",
  "CONTACT_FORM_TOUCH_RECIPIENTS",
  "CONTACT_FORM_TOUCH_RECIPIENT",
  "CONTACT_FORM_PRODUCT_ENQUIRY_RECIPIENTS",
  "CONTACT_FORM_PRODUCT_ENQUIRY_RECIPIENT",
  "CONTACT_FORM_SUPPORT_RECIPIENTS",
  "CONTACT_FORM_SUPPORT_RECIPIENT",
  "CONTACT_FORM_PARTNERSHIP_RECIPIENTS",
  "CONTACT_FORM_PARTNERSHIP_RECIPIENT",
  "CONTACT_FORM_CAREERS_RECIPIENTS",
  "CONTACT_FORM_CAREERS_RECIPIENT",
  "CONTACT_FORM_OTHER_RECIPIENTS",
  "CONTACT_FORM_OTHER_RECIPIENT",
];

const requiredResults = requiredChecks.map((check) => ({
  ...check,
  configured: getConfiguredEnv(check.envNames),
}));

const missingRequiredChecks = requiredResults.filter(
  (result) => !result.configured,
);
const configuredRecipients = getConfiguredEnv(recipientChecks);

console.log("Contact email configuration check");
console.log("");

for (const result of requiredResults) {
  if (result.configured) {
    console.log(
      `OK  ${result.label}: ${result.configured.envName} (${result.configured.source})`,
    );
  } else {
    console.log(`MISS ${result.label}: ${result.help}`);
  }
}

console.log("");

if (configuredRecipients) {
  console.log(
    `OK  Recipient routing: ${configuredRecipients.envName} (${configuredRecipients.source})`,
  );
} else {
  console.log(
    "WARN Recipient routing: no override is configured, so the API will fall back to the built-in default inboxes.",
  );
}

if (loadedFiles.length > 0) {
  console.log("");
  console.log(`Checked env files: ${loadedFiles.join(", ")}`);
}

if (missingRequiredChecks.length > 0) {
  console.log("");
  console.log("Production email is not ready yet.");
  process.exitCode = 1;
} else {
  console.log("");
  console.log("Production email configuration looks ready.");
}
