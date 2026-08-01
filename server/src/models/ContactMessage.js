import mongoose from 'mongoose'

// Schema for storing messages submitted through the portfolio contact form.
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    projectType: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

export default mongoose.model('ContactMessage', contactMessageSchema)
