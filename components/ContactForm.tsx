'use client'

import { FormEvent, useState } from 'react'
import SectionLabel from './SectionLabel'
import ScrollReveal from './ScrollReveal'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
          {submitted ? (
            <p className="font-body text-[0.95rem] text-muted font-light">
              送信ありがとうございます。
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block font-display text-[0.65rem] tracking-[0.15em] uppercase text-border mb-2">
                  Name
                </label>
                <input type="text" className="form-input" required />
              </div>
              <div className="mb-8">
                <label className="block font-display text-[0.65rem] tracking-[0.15em] uppercase text-border mb-2">
                  Email
                </label>
                <input type="email" className="form-input" required />
              </div>
              <div className="mb-8">
                <label className="block font-display text-[0.65rem] tracking-[0.15em] uppercase text-border mb-2">
                  Message
                </label>
                <textarea className="form-input min-h-[100px] leading-[1.7]" required />
              </div>
              <button
                type="submit"
                className="inline-block font-display text-[0.75rem] tracking-[0.15em] uppercase text-fg bg-transparent border border-fg px-10 py-4 cursor-pointer transition-all duration-300 mt-4 hover:bg-fg hover:text-bg"
              >
                Send
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
