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
      return res
        .status(400)
        .json({ message: "Enter a valid email address." });
    }

    // Save message in MongoDB
    const saved = await ContactMessage.create(req.body);

    // Send email notification
    if (isMailerConfigured()) {
      try {
        console.log("Sending email...");

        const info = await mailer.sendMail({
          // Always use the authenticated Gmail account
          from: process.env.EMAIL_USER,

          // Receive mail on your Gmail
          to: process.env.EMAIL_USER,

          // When you click Reply, it replies to the visitor
          replyTo: email,

          subject: `New Contact Message: ${subject}`,

          text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
          `,
        });

        console.log(" Email sent successfully");
        console.log(info);
      } catch (emailError) {
        console.error("========== MAIL ERROR ==========");
        console.error(emailError);
        console.error("Code:", emailError.code);
        console.error("Response Code:", emailError.responseCode);
        console.error("Response:", emailError.response);
        console.error("Command:", emailError.command);
        console.error("Stack:", emailError.stack);
        console.error("===============================");
      }
    } else {
      console.warn(
        "Email notification skipped: EMAIL_USER or EMAIL_PASS is not configured."
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