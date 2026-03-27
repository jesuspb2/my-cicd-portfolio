import { motion } from 'framer-motion'

/* ── Data ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title:       'Serverless Portfolio CI/CD',
    description: 'Full serverless portfolio with a complete GitHub Actions pipeline — OIDC auth, parallel build/deploy stages, and Playwright E2E across three browsers with Allure reporting.',
    tags:        ['Python', 'React', 'AWS Lambda', 'Terraform', 'GitHub Actions', 'Playwright'],
    link:        'https://github.com/jesuspb2/my-cicd-portfolio',
    accent:      'blue'  as const,
    icon:        '⚙️',
    stat:        { value: '5-stage', label: 'pipeline' },
  },
  {
    title:       'BDD E2E Test Framework',
    description: 'Multi-browser Playwright + Pytest framework with BDD (Behave) scenarios. Parallelised across Chromium, Firefox, and WebKit; results published as Allure HTML reports.',
    tags:        ['Playwright', 'Pytest', 'BDD', 'Behave', 'Allure', 'Docker'],
    link:        '#',
    accent:      'purple' as const,
    icon:        '🧪',
    stat:        { value: '3x', label: 'browsers' },
  },
  {
    title:       'Event-Driven Contract Suite',
    description: 'Contract testing for Kafka-based microservices. Schema validation across producer/consumer boundaries prevents silent breaking changes from reaching staging.',
    tags:        ['Python', 'Kafka', 'Pytest', 'Pact', 'AWS MSK'],
    link:        '#',
    accent:      'blue'  as const,
    icon:        '🔗',
    stat:        { value: '100%', label: 'contracts' },
  },
  {
    title:       'Test Data Factory',
    description: 'AWS Step Functions orchestration to provision complex, isolated test environments on demand. Replaces brittle shared fixtures with per-run, auto-cleaned data sets.',
    tags:        ['AWS Step Functions', 'Python', 'DynamoDB', 'Terraform'],
    link:        '#',
    accent:      'purple' as const,
    icon:        '🏭',
    stat:        { value: '0', label: 'shared state' },
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

/* ── Project Card ─────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number]
  index: number
}) {
  const color    = project.accent === 'blue' ? 'var(--blue)' : 'var(--purple)'
  const dimColor = project.accent === 'blue' ? 'var(--blue-subtle)' : 'var(--purple-subtle)'
  const isLink   = project.link !== '#'

  const CardWrapper = isLink
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => <div className="h-full">{children}</div>

  return (
    <motion.div
      className={`glass glass-${project.accent} h-full flex flex-col overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <CardWrapper>
        {/* Top accent bar */}
        <div
          className="h-1"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />

        <div className="p-6 flex flex-col h-full">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: dimColor, border: `1px solid ${color}33` }}
            >
              {project.icon}
            </div>
            <div className="text-right">
              <div className="font-black text-lg leading-none" style={{ color }}>
                {project.stat.value}
              </div>
              <div className="mono text-xs" style={{ color: 'var(--text-dim)' }}>
                {project.stat.label}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base mb-3 leading-snug" style={{ color: 'var(--text-bright)' }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--text-mid)' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span
                key={tag}
                className={`tag-${project.accent}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {isLink && (
            <div
              className="flex items-center gap-1.5 mono text-xs font-bold mt-auto"
              style={{ color }}
            >
              View on GitHub
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>↗</span>
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  )
}

/* ── Section ──────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>04 · selected work</SectionLabel>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-5xl mb-3" style={{ color: 'var(--text-bright)' }}>
            Project{' '}
            <span className="gradient-text">Index</span>
          </h2>
          <p className="text-base" style={{ color: 'var(--text-mid)', maxWidth: 480 }}>
            Systems built with testability and automation as first-class requirements.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
