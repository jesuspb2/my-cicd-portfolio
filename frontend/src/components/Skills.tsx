import { motion } from 'framer-motion'
import pythonImg    from '../assets/skills/python.svg'
import sqlImg       from '../assets/skills/sql.svg'
import TypeScript   from '../assets/skills/typescript.svg'
import AWS          from '../assets/skills/aws.svg'
import Jenkins      from '../assets/skills/jenkins.svg'
import Gitlab       from '../assets/skills/gitlab.svg'
import Terraform    from '../assets/skills/terraform.svg'
import Docker       from '../assets/skills/docker.svg'
import K6          from '../assets/skills/k6.png'
import Playwright   from '../assets/skills/playwright.svg'
import Cucumber     from '../assets/skills/cucumber.svg'

/* ── Skill categories ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Languages',
    accent: 'blue' as const,
    skills: [
      { name: 'Python',     logo: pythonImg  },
      { name: 'TypeScript', logo: TypeScript },
      { name: 'SQL',        logo: sqlImg     },
    ],
  },
  {
    label: 'Test Frameworks',
    accent: 'purple' as const,
    skills: [
      { name: 'Playwright', logo: Playwright },
      { name: 'k6',         logo: K6         },
      { name: 'Cucumber',   logo: Cucumber   },
    ],
  },
  {
    label: 'Cloud & Infra',
    accent: 'blue' as const,
    skills: [
      { name: 'AWS',       logo: AWS       },
      { name: 'Terraform', logo: Terraform },
      { name: 'Docker',    logo: Docker    },
    ],
  },
  {
    label: 'CI/CD',
    accent: 'purple' as const,
    skills: [
      { name: 'Jenkins', logo: Jenkins },
      { name: 'GitLab',  logo: Gitlab  },
    ],
  },
]

const LEVEL_DOTS = 5

const LEVELS: Record<string, number> = {
  Python: 5, TypeScript: 4, SQL: 4,
  Playwright: 5, k6: 4, Cucumber: 4,
  AWS: 4, Terraform: 4, Docker: 4,
  Jenkins: 4, GitLab: 4,
}

/* ── Section divider label ───────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="accent-line flex-1" />
      <span className="section-eyebrow whitespace-nowrap">{children}</span>
      <div className="accent-line flex-1" />
    </div>
  )
}

/* ── Individual skill card ────────────────────────────────────── */
function SkillCard({
  skill,
  accent,
  index,
}: {
  skill: { name: string; logo: string }
  accent: 'blue' | 'purple'
  index: number
}) {
  const color = accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
  const glow  = accent === 'blue' ? 'var(--blue-glow)' : 'var(--purple-glow)'
  const lvl   = LEVELS[skill.name] ?? 4

  return (
    <motion.div
      className={`glass glass-${accent} p-5 flex flex-col items-center gap-3 cursor-default select-none`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      {/* Logo */}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-xl"
        style={{ background: `rgba(255,255,255,0.05)`, border: '1px solid var(--glass-border)' }}
      >
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-9 h-9 object-contain"
        />
      </div>

      {/* Name */}
      <span
        className="font-bold text-sm tracking-wide text-center"
        style={{ color: 'var(--text-bright)' }}
      >
        {skill.name}
      </span>

      {/* Level dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: LEVEL_DOTS }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i < lvl ? color : 'var(--text-dim)',
              boxShadow: i < lvl ? `0 0 4px ${glow}` : 'none',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ── Category block ───────────────────────────────────────────── */
function Category({
  cat,
  baseIndex,
}: {
  cat: (typeof CATEGORIES)[number]
  baseIndex: number
}) {
  const color = cat.accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
  return (
    <div className="mb-12">
      {/* Category header */}
      <motion.div
        className="flex items-center gap-3 mb-5"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="mono text-xs font-bold tracking-widest uppercase" style={{ color }}>
          {cat.label}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }}
        />
      </motion.div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 gap-3">
        {cat.skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} accent={cat.accent} index={baseIndex + i} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  let runningIdx = 0
  return (
    <section id="skills" className="pt-6 pb-2 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>02 · tech stack</SectionLabel>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2
            className="font-black text-5xl mb-3"
            style={{ color: 'var(--text-bright)' }}
          >
            Tool{' '}
            <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-mid)', maxWidth: 480 }}>
            The stack I reach for when building reliable test infrastructure at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10">
          {CATEGORIES.map((cat) => {
            const start = runningIdx
            runningIdx += cat.skills.length
            return <Category key={cat.label} cat={cat} baseIndex={start} />
          })}
        </div>
      </div>
    </section>
  )
}
