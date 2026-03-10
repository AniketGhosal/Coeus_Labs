import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const navItems = ['Features', 'Story', 'Stats', 'Showcase', 'Contact']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/8 py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#00d9ff] flex items-center justify-center text-xs font-bold shadow-lg shadow-[#7c5cfc]/30 group-hover:scale-110 transition-transform duration-300">
              NX
            </div>
            <span
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              className="text-base font-semibold tracking-[0.12em] uppercase text-white"
            >
              NexaVerse
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm text-white/70 hover:text-white transition-colors duration-200 group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#7c5cfc] to-[#00d9ff] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-shimmer rounded-full px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[#7c5cfc]/30 hover:scale-105 transition-transform duration-200"
            >
              Let's Talk
            </a>
          </div>

          {/* Hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden flex-col gap-1.5 p-1 group"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px bg-white/70 transition-all duration-300 ${
                  i === 0 ? (menuOpen ? 'w-6 translate-y-2.5 rotate-45' : 'w-6') :
                  i === 1 ? (menuOpen ? 'w-0 opacity-0' : 'w-4') :
                  (menuOpen ? 'w-6 -rotate-45 -translate-y-2.5' : 'w-6')
                }`}
              />
            ))}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#7c5cfc] to-[#00d9ff] transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/8 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg text-white/80 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-shimmer w-max rounded-full px-6 py-2.5 text-sm font-medium text-white"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
