import nodemailer from 'nodemailer'

export const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export function isMailerConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
}
