import { Resend } from "resend";

const hasMailerConfig = Boolean(process.env.RESEND_API_KEY);

export const mailer = hasMailerConfig
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (hasMailerConfig) {
  console.log(" Resend configured");
} else {
  console.warn("RESEND_API_KEY is not configured");
}

export function isMailerConfigured() {
  return hasMailerConfig;
}