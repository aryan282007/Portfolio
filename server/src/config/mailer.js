import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

mailer.verify((err) => {
  if (err) {
    console.error("SMTP VERIFY ERROR");
    console.error(err);
  } else {
    console.log(" SMTP READY");
  }
});

export function isMailerConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
}