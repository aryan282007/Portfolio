import ContactMessage from "../models/ContactMessage.js";
import { isMailerConfigured, mailer } from "../config/mailer.js";

export async function createContactMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject, and message are required.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }

    // Save message in MongoDB
    const saved = await ContactMessage.create(req.body);

    // Send email notification
    if (isMailerConfigured()) {
      try {
        console.log("Sending email...");

    const info = await mailer.emails.send({
  from: "Aryan Portfolio <onboarding@resend.dev>",
  to: process.env.EMAIL_USER,
  replyTo: email,
  subject: `New Contact Message: ${subject}`,
  html: `
    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Subject:</strong> ${subject}</p>

    <p>${message}</p>
  `,
});
      
        console.log(" Email sent successfully");
        console.log(info);
      } catch (emailError) {
        console.error(emailError);
      }
    } else {
      console.warn(
        "Email notification skipped: EMAIL_USER or EMAIL_PASS is not configured.",
      );
    }

    return res.status(201).json({
      message: "Message received.",
      id: saved._id,
    });
  } catch (err) {
    console.error("createContactMessage error:", err);

    return res.status(500).json({
      message: "Could not send message. Try again shortly.",
    });
  }
}
