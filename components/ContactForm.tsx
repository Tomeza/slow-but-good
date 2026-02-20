'use client'

import { FormEvent, useState } from 'react'
import SectionLabel from './SectionLabel'
import ScrollReveal from './ScrollReveal'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot }),
      })

      const data = await response.json()

      if (!response.ok) {
        setFormState('error')
        setErrorMessage(data.error || '送信に失敗しました')
        return
      }

      setFormState('success')
    } catch {
      setFormState('error')
      setErrorMessage('送信に失敗しました。しばらくしてからお試しください。')
    }
  }

  return (
    <section className="px-[8vw] py-32 max-sm:px-[6vw] max-sm:py-20">
      <ScrollReveal>
        <SectionLabel>Contact</SectionLabel>
      </ScrollReveal>
      <div className="max-w-[480px]">
        <ScrollReveal>
          <p className="font-body text-[0.95rem] text-muted mb-12 leading-[2] font-light">
            お仕事のご相談、お気軽にどうぞ。
          </p>
        </ScrollReveal>
        <ScrollReveal>
          {formState === 'success' ? (
            <p className="font-body text-[0.95rem] text-muted font-light">
              送信ありがとうございます。
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px]"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="mb-8">
                <label className="block font-display text-[0.65rem] tracking-[0.15em] uppercase text-border mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={formState === 'submitting'}
                />
              </div>
              <div className="mb-8">
                <label className="block font-display text-[0.65rem] tracking-[0.15em] uppercase text-border mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={formState === 'submitting'}
                />
              </div>
              <div className="mb-8">
                <label className="block font-display text-[0.65rem] tracking-[0.15em] uppercase text-border mb-2">
                  Message
                </label>
                <textarea
                  className="form-input min-h-[100px] leading-[1.7]"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={formState === 'submitting'}
                />
              </div>
              {formState === 'error' && (
                <p className="font-body text-[0.85rem] text-red-600 mb-4">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="inline-block font-display text-[0.75rem] tracking-[0.15em] uppercase text-fg bg-transparent border border-fg px-10 py-4 cursor-pointer transition-all duration-300 mt-4 hover:bg-fg hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
