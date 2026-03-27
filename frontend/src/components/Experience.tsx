import { motion } from 'framer-motion'
import xm      from '../assets/experience/xm.png'
import align   from '../assets/experience/align.png'
import siemens from '../assets/experience/siemens.svg'

/* ── Data ─────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    title:   'Software Engineer in Test',
    company: 'XM',
    period:  'Dec 2025 – Present',
    logo:    xm,
    logoText: null,
    accent:  'blue' as const,
    tag:     'Current',
    bullets: [
      'Led design and implementation of full-stack test automation frameworks for a Backstage-based IDP, establishing testing standards from the ground up for the Platform Engineering team.',
      'Architected a Page Object Model layer in Playwright covering Backstage plugin UI, reducing test flakiness and enabling parallel execution across CI pipelines.',
      'Owned end-to-end quality strategy for Platform Engineering services — defining coverage targets, test pyramid structure, and CI/CD integration gates.',
      'Drove Shift-Left adoption by embedding automated API and integration tests into developer workflows, cutting manual QA cycles on platform releases.',
      'Partnered with platform engineers at design phase to define testability requirements, influencing architecture decisions for observability and reliability.',
    ],
  },
  {
    title:   'Software Engineer in Test',
    company: 'Align Technology',
    period:  '2023 – 2025',
    logo:    align,
    logoText: null,
    accent:  'purple' as const,
    tag:     'Past',
    bullets: [
      'Built Python/Pytest + Behave BDD frameworks for serverless event-driven microservices — raised coverage from ad-hoc to systematic regression suites.',
      'Designed E2E integration and contract tests for Kafka/AWS EventBridge services; caught schema drift before it reached production.',
      'Implemented CI/CD pipelines with automated build → test → deploy gates and AWS Step Functions for on-demand test data orchestration.',
      'Validated REST APIs and performance-tested event-driven flows via Apache Kafka and AWS Step Functions.',
      'Monitored production behaviour via CloudWatch + Splunk; fed findings back into test case design.',
    ],
  },
  {
    title:   'Electrical Project Engineer',
    company: 'Siemens',
    period:  'Dec 2020 – Jan 2023',
    logo:    siemens,
    logoText: null,
    accent:  'purple' as const,
    tag:     'Past',
    bullets: [
      'Led end-to-end delivery of large-scale electrical projects, managing technical scope, timelines, and client communication.',
      'Designed and coordinated Busbar and industrial electrical channeling systems using AutoCAD and Revit.',
      'Served as primary technical point of contact for clients, translating complex engineering requirements into actionable project specs.',
      'Applied systematic problem-solving and attention to detail across high-stakes environments — skills later transferred into software quality engineering.',
    ],
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

/* ── Timeline Card ────────────────────────────────────────────── */
function ExpCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof EXPERIENCES)[number]
  index: number
  isLast: boolean
}) {
  const color = exp.accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
  const glow  = exp.accent === 'blue' ? 'var(--blue-glow)' : 'var(--purple-glow)'

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline column — desktop only */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className="relative z-10 flex items-center justify-center rounded-xl flex-shrink-0 overflow-hidden"
          style={{
            width: 44, height: 44,
            border: `2px solid ${color}`,
            boxShadow: `0 0 16px ${glow}`,
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.15 }}
          viewport={{ once: true }}
        >
          {exp.logo
            ? <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
            : <span className="mono font-black text-xs" style={{ color, letterSpacing: '0.05em' }}>{exp.logoText}</span>
          }
        </motion.div>

        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-3"
            style={{ background: `linear-gradient(180deg, ${color}60, transparent)`, originY: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className={`glass glass-${exp.accent} flex-1 p-6 mb-10`}
        style={{ borderLeft: `2px solid ${color}33` }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            {/* Logo — mobile only */}
            <div className="flex items-center gap-3 mb-3 md:hidden">
              <div
                className="flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0"
                style={{ width: 36, height: 36, border: `2px solid ${color}`, boxShadow: `0 0 10px ${glow}` }}
              >
                {exp.logo
                  ? <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                  : <span className="mono font-black" style={{ color, fontSize: '0.6rem' }}>{exp.logoText}</span>
                }
              </div>
              <p className="font-semibold text-base" style={{ color }}>{exp.company}</p>
            </div>

            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-bright)' }}>
                {exp.title}
              </h3>
              <span
                className="mono text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ color, background: `${color}18`, border: `1px solid ${color}44` }}
              >
                {exp.tag}
              </span>
            </div>
            <p className="hidden md:block font-semibold text-base" style={{ color }}>
              {exp.company}
            </p>
          </div>
          <span
            className="mono text-xs px-3 py-1.5 rounded-lg flex-shrink-0"
            style={{
              color: 'var(--text-mid)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {exp.period}
          </span>
        </div>

        {/* Bullets */}
        <ul className="space-y-2.5">
          {exp.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              className="flex gap-3 text-sm leading-relaxed"
              style={{ color: 'var(--text-mid)' }}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.06 + 0.2 }}
              viewport={{ once: true }}
            >
              <span className="flex-shrink-0 mt-0.5" style={{ color }}>›</span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="pb-6 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>03 · work history</SectionLabel>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-5xl mb-3" style={{ color: 'var(--text-bright)' }}>
            Experience{' '}
            <span className="gradient-text">Log</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-mid)', maxWidth: 480 }}>
            A track record of shipping quality at speed, from manual roots to cloud-native automation.
          </p>
        </motion.div>

        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExpCard
              key={exp.company}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
