import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

// Allow the frontend to communicate with this backend using CORS.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())
app.set("trust proxy", 1);

// Protect the public contact endpoint from too many requests in a short period.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests. Try again later.' },
})

app.use('/api/contact', contactLimiter, contactRouter)

// Health check endpoint for deployments and monitoring.
app.get('/api/health', (req, res) => res.json({ ok: true }))

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  } catch (err) {
    console.error('Failed to start server:', err.message)
    process.exit(1)
  }
}

start()
