import { motion } from 'framer-motion'
import awsArchitect    from '../assets/certifications/architect.png'
import awsPractitioner from '../assets/certifications/practitioner.png'

const CERTS = [
  {
    title:  'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    level:  'ASSOCIATE',
    year:   '2024',
    logo:   awsArchitect,
    accent: 'blue' as const,
    link:   'https://www.credly.com/badges/81c75231-8837-41ab-8964-af9ac9e6ea5c/public_url',
  },
  {
    title:  'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    level:  'FOUNDATIONAL',
    year:   '2023',
    logo:   awsPractitioner,
    accent: 'purple' as const,
    link:   'https://www.credly.com/badges/093478e0-dcc0-452d-92f5-5095fffa3a40/public_url',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="accent-line flex-1" />
      <span className="section-eyebrow whitespace-nowrap">{children}</span>
      <div className="accent-line flex-1" />
    </div>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="pb-6 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>05 · credentials</SectionLabel>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-5xl mb-3" style={{ color: 'var(--text-bright)' }}>
            Cert{' '}
            <span className="gradient-text">Vault</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-mid)', maxWidth: 400 }}>
            Verified cloud credentials. Click to verify on Credly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
          {CERTS.map((cert, i) => {
            const color = cert.accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
            return (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass glass-${cert.accent} block overflow-hidden group`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                {/* Top accent bar */}
                <div
                  className="h-0.5"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />

                <div className="p-6 flex gap-5 items-center">
                  {/* Badge */}
                  <div
                    className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    <img
                      src={cert.logo}
                      alt={cert.title}
                      className="w-16 h-16 object-contain"
                      style={{ filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.15))' }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="mono text-xs font-bold mb-2 px-2 py-0.5 rounded inline-block"
                      style={{
                        color,
                        background: `${color}15`,
                        border: `1px solid ${color}33`,
                      }}
                    >
                      {cert.level}
                    </div>
                    <h3
                      className="font-bold text-sm leading-snug mb-1"
                      style={{ color: 'var(--text-bright)' }}
                    >
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs" style={{ color: 'var(--text-dim)' }}>
                        {cert.issuer} · {cert.year}
                      </span>
                      <span
                        className="mono text-xs transition-transform group-hover:translate-x-0.5"
                        style={{ color }}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
