import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import profileImg from '../assets/aboutme/profile.jpeg'

/* ── Animated test runner widget ──────────────────────────────── */
const TEST_LINES = [
  { suite: 'backstage.plugin',  test: 'catalog page renders',  ms: 234  },
  { suite: 'api.idp',           test: 'GET /entities → 200',   ms: 89   },
  { suite: 'e2e.playwright',    test: 'create component UI',   ms: 1842 },
  { suite: 'contract.schema',   test: 'entity schema valid',   ms: 47   },
  { suite: 'e2e.playwright',    test: 'scaffold template',     ms: 2103 },
  { suite: 'integration.auth',  test: 'OIDC token exchange',   ms: 112  },
  { suite: 'unit.handler',      test: 'plugin config valid',   ms: 28   },
  { suite: 'api.contact',       test: 'POST /contact → 201',   ms: 156  },
]

function TestRunner() {
  const [visible, setVisible] = useState<number[]>([])
  const [tick, setTick]       = useState(0)
  const total = TEST_LINES.length

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setVisible(prev => [...prev.slice(-5), i % total])
      i++
      setTick(t => t + 1)
    }, 900)
    return () => clearInterval(id)
  }, [total])

  const passed = tick > 0 ? Math.min(tick, total) : 0

  return (
    <div className="test-runner w-full max-w-sm">
      <div className="test-runner-bar">
        <span className="tr-dot" style={{ background: '#FF5F57' }} />
        <span className="tr-dot" style={{ background: '#FFBD2E' }} />
        <span className="tr-dot" style={{ background: '#28C840' }} />
        <span className="mono ml-3" style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
          pytest · running
        </span>
        <span className="ml-auto mono" style={{ color: 'var(--blue)', fontSize: '0.7rem' }}>
          {passed}/{total} passed
        </span>
      </div>
      <div className="p-4 space-y-2" style={{ minHeight: 168 }}>
        {visible.map((lineIdx, i) => {
          const line = TEST_LINES[lineIdx]
          return (
            <motion.div
              key={`${lineIdx}-${tick - visible.length + i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span style={{ color: '#4ADE80', fontSize: '0.72rem' }}>✓</span>
              <span className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>
                {line.suite}
              </span>
              <span className="mono" style={{ color: 'var(--text-mid)', fontSize: '0.68rem' }}>
                {line.test}
              </span>
              <span className="ml-auto mono" style={{ color: 'var(--text-dim)', fontSize: '0.65rem' }}>
                {line.ms}ms
              </span>
            </motion.div>
          )
        })}
        <div className="flex items-center gap-2 pt-1">
          <span className="animate-blink mono" style={{ color: 'var(--blue)', fontSize: '0.72rem' }}>▶</span>
          <span className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>
            collecting tests<span className="animate-blink">_</span>
          </span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--blue), var(--purple))',
            }}
            animate={{ width: `${(Math.min(tick, total) / total) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Typewriter roles ─────────────────────────────────────────── */
const ROLES = [
  'Software Engineer in Test',
  'Test Automation Architect',
  'Platform Quality Engineer',
  'CI/CD Pipeline Builder',
  'Shift-Left Advocate',
]

function Typewriter() {
  const [roleIdx, setRoleIdx]   = useState(0)
  const [displayed, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef              = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const target = ROLES[roleIdx]
    if (!deleting && displayed.length < target.length) {
      timeoutRef.current = setTimeout(() => setDisplay(target.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === target.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplay(displayed.slice(0, -1)), 38)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, deleting, roleIdx])

  return (
    <span>
      <span className="gradient-text font-semibold">{displayed}</span>
      <span className="animate-blink" style={{ color: 'var(--blue)' }}>|</span>
    </span>
  )
}

/* ── Stats ────────────────────────────────────────────────────── */
const STATS = [
  { value: '5+',   label: 'Years SDET'     },
  { value: '3x',   label: 'Browsers E2E'   },
  { value: '100%', label: 'CI Automated'   },
  { value: '2',    label: 'AWS Certified'  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative flex items-center grid-overlay overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          top: '-10%', left: '-5%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          bottom: '-5%', right: '-5%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full px-6 pt-20 pb-2 lg:pt-28 lg:pb-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Text ──────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              className="section-eyebrow mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              // sdet · madrid, spain
            </motion.p>

            {/* Name */}
            <motion.h1
              className="font-black leading-none mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', color: 'var(--text-bright)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Jesús<br />
              <span className="gradient-text">Prian</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.p
              className="text-xl mb-8"
              style={{ color: 'var(--text-mid)', minHeight: '1.8rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Typewriter />
            </motion.p>

            {/* Bio */}
            <motion.p
              className="text-base mb-10 leading-relaxed"
              style={{ color: 'var(--text-mid)', maxWidth: 480 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              SDET with 5+ years leading quality strategy for{' '}
              <span style={{ color: 'var(--text-bright)' }}>cloud-native</span> and{' '}
              <span style={{ color: 'var(--text-bright)' }}>platform engineering</span> environments.
              Currently at XM, owning the full test pyramid for a Backstage-based IDP.
              Passionate about Shift-Left testing and developer experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </button>
              <button
                className="btn-ghost"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                >
                  <div
                    className="text-2xl font-black mb-1 gradient-text"
                  >
                    {s.value}
                  </div>
                  <div className="mono text-xs" style={{ color: 'var(--text-dim)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile + Test Runner ────────────────────── */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Profile image */}
            <div className="relative">
              <div
                className="rounded-full"
                style={{
                  padding: 3,
                  background: 'linear-gradient(135deg, var(--blue), var(--purple), var(--blue))',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 4s ease infinite',
                  display: 'inline-block',
                }}
              >
                <img
                  src={profileImg}
                  alt="Jesús Prian"
                  className="rounded-full object-cover block"
                  style={{ width: 182, height: 182 }}
                />
              </div>
              {/* Status badge */}
              <div
                className="absolute bottom-3 right-3 glass flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ border: '1px solid rgba(74,222,128,0.3)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#4ADE80', boxShadow: '0 0 6px #4ADE80', animation: 'pulse-glow 2s ease infinite' }}
                />
                <span className="mono text-xs" style={{ color: '#4ADE80' }}>Available</span>
              </div>
            </div>

            {/* Test runner */}
            <TestRunner />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="mono text-xs" style={{ color: 'var(--text-dim)' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: 'var(--text-dim)' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
