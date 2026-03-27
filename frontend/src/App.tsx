import { useState, useEffect } from 'react'
import './index.css'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Projects from './components/Projects'

const navLinks = [
  { id: 'about',          label: 'About'          },
  { id: 'skills',         label: 'Skills'         },
  { id: 'experience',     label: 'Experience'     },
  { id: 'projects',       label: 'Projects'       },
  { id: 'certifications', label: 'Certs'          },
  { id: 'contact',        label: 'Contact'        },
]

function App() {
  const [isMenuOpen, setIsMenuOpen]   = useState(false)
  const [scrolled,   setScrolled]     = useState(false)
  const [activeSection, setActive]    = useState('about')
  const [darkMode, setDarkMode]       = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }

  return (
    <div className="mesh-bg min-h-screen">
      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300"
      >
        <div
          className={`nav-pill flex items-center gap-1 px-4 h-12 transition-all duration-300 ${
            scrolled ? 'shadow-lg shadow-black/40' : ''
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => scrollTo('about')}
            className="mono text-xs font-bold mr-4 tracking-widest"
            style={{ color: 'var(--blue)' }}
          >
            JP
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200"
                style={{
                  color: activeSection === id ? 'var(--blue)' : 'var(--text-mid)',
                }}
              >
                {label}
                {activeSection === id && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'var(--blue)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(d => !d)}
            className="ml-2 p-1.5 rounded-full transition-colors duration-200"
            style={{ color: 'var(--text-mid)' }}
            aria-label="Toggle theme"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-1 p-1"
            style={{ color: 'var(--text-mid)' }}
            onClick={() => setIsMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div
            className="absolute top-full mt-2 left-4 right-4 glass rounded-2xl py-3 flex flex-col md:hidden"
            style={{ border: '1px solid var(--glass-border)' }}
          >
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-5 py-3 text-sm font-medium text-left transition-colors"
                style={{ color: activeSection === id ? 'var(--blue)' : 'var(--text-mid)' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Main Content ───────────────────────────────────────── */}
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: 'var(--glass-border)' }}>
        <p className="mono text-xs" style={{ color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Jesús Prian Baena &nbsp;·&nbsp;{' '}
          <a
            href="https://github.com/jesuspb2/my-cicd-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'var(--text-mid)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
          >
            View source on GitHub ↗
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
