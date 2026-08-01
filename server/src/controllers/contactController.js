import ContactMessage from '../models/ContactMessage.js'
import { isMailerConfigured, mailer } from '../config/mailer.js'

// Controller for handling incoming contact form submissions.
export async function createContactMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body

    // Validate the required fields before saving or sending notifications.
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'Name, email, subject, and message are required.',
      })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' })
    }

    // Persist the message to MongoDB.
    const saved = await ContactMessage.create(req.body)

    // Send an email notification only when mailer credentials are available.
    if (isMailerConfigured()) {
      try {
        await mailer.sendMail({
          from: `"Portfolio Contact" <${email}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `New contact message: ${subject}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            '',
            message,
          ].join('\n'),
        })
      } catch (emailError) {
        console.error('sendContactEmail error:', emailError)
      }
    } else {
      console.warn('Email notification skipped: EMAIL_USER or EMAIL_PASS is not configured.')
    }

    return res.status(201).json({
      message: 'Message received.',
      id: saved._id,
    })
  } catch (err) {
    console.error('createContactMessage error:', err)
    return res.status(500).json({ message: 'Could not send message. Try again shortly.' })
  }
}
