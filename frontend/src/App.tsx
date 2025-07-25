import { useState, useEffect } from 'react'
import './index.css'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import { Sun, Moon } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode')
      if (stored !== null) return stored === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDarkMode])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left: Name */}
            <a href="#" className="text-xl font-bold text-gray-950 dark:text-white transition-colors duration-200">
              Hi 👋🏼, I'm Jesús Prian
            </a>

            {/* Right: Navigation + Dark mode + Mobile menu */}
            <div className="flex items-center space-x-8">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => handleNavClick('about')}
                  className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  About
                </button>
                <button 
                  onClick={() => handleNavClick('experience')}
                  className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  Experience
                </button>
                <button 
                  onClick={() => handleNavClick('skills')}
                  className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  Skills
                </button>
                <button 
                  onClick={() => handleNavClick('certifications')}
                  className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  Certifications
                </button>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                >
                  Contact
                </button>
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {['about', 'skills', 'experience', 'certifications', 'contact'].map((id) => (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200 text-left"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300 transition-colors duration-200">
          <p>&copy; {new Date().getFullYear()} - More info about this project on GitHub: <a className="text underline" target="_blank" href="https://github.com/jesuspb2/my-cicd-portfolio">my-cicd-portfolio</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
