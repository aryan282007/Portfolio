import nodemailer from "nodemailer";

const hasMailerConfig = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (hasMailerConfig) {
  mailer.verify((err) => {
    if (err) {
      console.error("SMTP VERIFY ERROR");
      console.error(err);
    } else {
      console.log("SMTP READY");
    }
  });
}

export function isMailerConfigured() {
  return hasMailerConfig;
}