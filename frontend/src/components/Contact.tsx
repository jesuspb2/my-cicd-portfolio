import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'

/* ── Channel data ─────────────────────────────────────────────── */
const CHANNELS = [
  {
    icon:  FaLinkedin,
    label: 'LinkedIn',
    value: 'Jesús Prian Baena',
    href:  'https://www.linkedin.com/in/jesusprianbaena/',
    color: 'var(--blue)',
  },
  {
    icon:  FaEnvelope,
    label: 'Email',
    value: 'jesuspb2@gmail.com',
    href:  'mailto:jesuspb2@gmail.com',
    color: 'var(--purple)',
  },
  {
    icon:  FaPhone,
    label: 'Phone',
    value: '+34 664 635 223',
    href:  'tel:+34664635223',
    color: 'var(--blue)',
  },
  {
    icon:  FaGithub,
    label: 'GitHub',
    value: 'jesuspb2',
    href:  'https://github.com/jesuspb2',
    color: 'var(--purple)',
  },
]

/* ── Helpers ──────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="accent-line flex-1" />
      <span className="section-eyebrow whitespace-nowrap">{children}</span>
      <div className="accent-line flex-1" />
    </div>
  )
}

function FormLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mono text-xs font-bold tracking-widest uppercase mb-2"
      style={{ color: 'var(--blue)' }}
    >
      {children}
    </label>
  )
}

/* ── Component ────────────────────────────────────────────────── */
export default function Contact() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="pt-12 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>06 · get in touch</SectionLabel>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-5xl mb-3" style={{ color: 'var(--text-bright)' }}>
            Init{' '}
            <span className="gradient-text">Contact</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-mid)', maxWidth: 480 }}>
            Open to new opportunities, collaborations, and interesting engineering conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">

          {/* ── Left: Channels ───────────────────────────────────── */}
          <motion.div
            className="glass p-7"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mono text-xs mb-6" style={{ color: 'var(--text-dim)' }}>
              {'> ls -la channels/'}
            </p>
            <div className="space-y-5">
              {CHANNELS.map(ch => {
                const Icon = ch.icon
                return (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: `${ch.color}15`,
                        border: `1px solid ${ch.color}30`,
                      }}
                    >
                      <Icon style={{ color: ch.color, width: 18, height: 18 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mono text-xs mb-0.5" style={{ color: 'var(--text-dim)' }}>
                        {ch.label}
                      </div>
                      <div
                        className="text-sm font-medium truncate transition-colors duration-200"
                        style={{ color: 'var(--text-mid)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = ch.color)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
                      >
                        {ch.value}
                      </div>
                    </div>
                    <span
                      className="mono text-xs transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: ch.color }}
                    >
                      ›
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Status */}
            <div
              className="mt-8 pt-6 flex items-center gap-3"
              style={{ borderTop: '1px solid var(--glass-border)' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: '#4ADE80',
                  boxShadow: '0 0 6px #4ADE80',
                  animation: 'pulse-glow 2s ease infinite',
                }}
              />
              <span className="mono text-xs" style={{ color: 'var(--text-dim)' }}>
                Status: <span style={{ color: '#4ADE80' }}>available for work</span>
              </span>
            </div>
          </motion.div>

          {/* ── Right: Form ──────────────────────────────────────── */}
          <motion.div
            className="glass p-7"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="mono text-xs mb-6" style={{ color: 'var(--text-dim)' }}>
              {'> compose --encrypt --to jesuspb2'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <FormLabel htmlFor="name">name</FormLabel>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <FormLabel htmlFor="email">email</FormLabel>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <FormLabel htmlFor="message">message</FormLabel>
                <textarea
                  id="message"
                  className="form-input resize-none"
                  rows={4}
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '[ TRANSMITTING... ]' : '[ SEND_MESSAGE ]'}
              </button>

              {status === 'success' && (
                <motion.p
                  className="mono text-sm text-center"
                  style={{ color: '#4ADE80' }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Message transmitted successfully
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className="mono text-sm text-center"
                  style={{ color: 'var(--purple)' }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✗ Transmission failed — try email instead
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
