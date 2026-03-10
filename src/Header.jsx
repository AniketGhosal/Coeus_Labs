import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { logoVideo } from './assets/assetHelper'

const navLinks = [
  { label: 'Home',             path: '/',         anchor: 'home'      },
  { label: 'Solutions',        path: '/',         anchor: 'solutions' },
  { label: 'Technology',       path: '/',         anchor: 'technology'},
  { label: 'Benefits',         path: '/',         anchor: 'benefits'  },
  { label: 'Careers',          path: '/careers',  anchor: ''          },
  { label: 'Talent Solutions', path: '/talent-solutions', anchor: ''  },
  { label: 'Contact',          path: '/',         anchor: 'contact'   },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // After navigating to home, scroll to anchor stored in sessionStorage
  useEffect(() => {
    const anchor = sessionStorage.getItem('scrollTo')
    if (anchor && location.pathname === '/') {
      sessionStorage.removeItem('scrollTo')
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [location.pathname])

  const handleClick = (e, path, anchor) => {
    e.preventDefault()
    setOpen(false)
    if (!anchor) {
      // pure page link (Careers, Talent Solutions)
      navigate(path)
      return
    }
    if (location.pathname === path) {
      // already on the right page — just scroll
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // navigate to home first, then scroll after mount
      sessionStorage.setItem('scrollTo', anchor)
      navigate(path)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-20">
        <a href="#" onClick={e => handleClick(e, '/', 'home')} className="flex items-center gap-3 group cursor-pointer relative">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <video src={logoVideo} autoPlay loop muted playsInline className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none relative z-10 scale-[1.3] origin-left" style={{ mixBlendMode: 'screen', filter: 'contrast(2.5) brightness(1.4)' }} />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ label, path, anchor }) => (
            <a key={label} href="#" onClick={e => handleClick(e, path, anchor)}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group cursor-pointer">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300" />
            </a>
          ))}
        </nav>

        <a href="https://forms.gle/ou4h4RWvYLPB983h7" target="_blank" rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5">
          Get in Touch
        </a>

        <button className="lg:hidden text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/20 py-6 px-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ label, path, anchor }) => (
              <a key={label} href="#" onClick={e => handleClick(e, path, anchor)}
                className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1 cursor-pointer">
                {label}
              </a>
            ))}
            <a href="https://forms.gle/ou4h4RWvYLPB983h7" target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full">
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
