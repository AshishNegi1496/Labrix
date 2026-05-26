// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require("nodemailer");

async function testSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false,
      auth: {
        user: "support@clinrtglobal.com",
        pass: "C44AA9575FB2E08CEF4C0A366EB02184B5EB",
      },
    });

    console.log("Checking SMTP connection...");

    await transporter.verify();

    console.log("✅ SMTP connection successful");

    const info = await transporter.sendMail({
      from: '"iClinRT Support" <support@clinrtglobal.com>',
      to: "support@clinrtglobal.com",
      subject: "SMTP Test",
      text: "SMTP is working 😈",
    });

    console.log("✅ Email sent");
    console.log(info);
  } catch (error) {
    console.error("❌ SMTP FAILED");
    console.error(error);
  }
}

testSMTP();