import { Router } from 'express'
import { createContactMessage, listContactMessages } from '../controllers/contactController.js'

const router = Router()

// POST /api/contact — used by the public contact form
router.post('/', createContactMessage)

// GET /api/contact — for you to view submissions (protect this before deploying publicly)
router.get('/', listContactMessages)

export default router
