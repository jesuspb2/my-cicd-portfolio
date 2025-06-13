import { useState } from 'react'
import './index.css'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">
              Hi 👋🏼, I'm Jesús Prian
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
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

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
                About
              </a>
              <a href="#skills" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
                Skills
              </a>
              <a href="#experience" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
                Experience
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#about"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  About
                </a>
                <a
                  href="#skills"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  Skills
                </a>
                <a
                  href="#experience"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} - Jesús Prian</p>
        </div>
      </footer>
    </div>
  )
}

export default App
