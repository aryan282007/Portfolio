import { useState } from 'react'
import { sendContactMessage } from '../lib/api'

const initial = {
  name: '',
  email: '',
  phone: '',
  projectType: 'Full Stack Build',
  subject: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <section id="contact" className="border-t border-base-border/60 bg-base-alt/30 py-24">
      <div className="section">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">Contact me</h2>
          <p className="mt-3 text-ink-dim">
            Have a project in mind? Fill the form and I'll get back to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card mx-auto mt-12 max-w-2xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="field"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="field"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number (optional)"
              className="field"
            />
            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              className="field"
            >
              <option>Full Stack Build</option>
              <option>Frontend Only</option>
              <option>Backend / API</option>
              <option>Consulting</option>
            </select>
          </div>

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="field"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            required
            rows={5}
            className="field resize-none"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              {status === 'success' && (
                <span className="text-green-400">Message sent — I'll reply soon.</span>
              )}
              {status === 'error' && <span className="text-red-400">{error}</span>}
            </div>
            <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-60">
              {status === 'loading' ? 'Sending…' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
