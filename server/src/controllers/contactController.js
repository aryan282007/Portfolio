import ContactMessage from '../models/ContactMessage.js'

export async function createContactMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'Name, email, subject, and message are required.',
      })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' })
    }

    const saved = await ContactMessage.create(req.body)

    return res.status(201).json({
      message: 'Message received.',
      id: saved._id,
    })
  } catch (err) {
    console.error('createContactMessage error:', err)
    return res.status(500).json({ message: 'Could not send message. Try again shortly.' })
  }
}

export async function listContactMessages(req, res) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    return res.json(messages)
  } catch (err) {
    console.error('listContactMessages error:', err)
    return res.status(500).json({ message: 'Could not load messages.' })
  }
}
