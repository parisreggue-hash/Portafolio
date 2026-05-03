import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'

const navItems = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Proyectos', href: '/proyectos', isRoute: true },
  { label: 'Servicios', href: '#servicios' },
]

export default function Navbar({ darkMode, onToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href, isRoute) => {
    e.preventDefault()
    setOpen(false)
    if (isRoute) {
      navigate(href)
      return
    }
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className="w-full max-w-3xl flex items-center justify-between px-4 h-16 rounded-xl transition-all duration-300"
        style={{
          background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: darkMode ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.60)',
          boxShadow: 'none',
        }}
      >
        {/* Logo */}
        <a href="#inicio" onClick={(e) => handleNav(e, '#inicio')} className="flex items-center gap-2 flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#12c352"/>
            <text x="16" y="22" fontFamily="monospace" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#000">&lt;/&gt;</text>
          </svg>
          <span className="font-display font-bold text-sm transition-colors duration-300"
            style={{ color: darkMode ? '#ffffff' : '#111111' }}>
            dev
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNav(e, item.href, item.isRoute)}
                className="px-3 py-1.5 rounded-xl font-body transition-all duration-200"
                style={{ color: darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}
                onMouseEnter={e => e.currentTarget.style.color = darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color = darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)'}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Botón dark/light mode */}
          <button
            onClick={onToggle}
            className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden transition-opacity hover:opacity-80"
            style={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
            aria-label="Cambiar modo"
          >
            <Sun
              size={18}
              className="absolute transition-all duration-300"
              style={{
                transform: darkMode ? 'scale(0.5) translateY(20px)' : 'scale(1) translateY(0px)',
                opacity: darkMode ? 0 : 1,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
            <Moon
              size={18}
              className="absolute transition-all duration-300"
              style={{
                transform: darkMode ? 'scale(1) translateY(0px)' : 'scale(0.5) translateY(20px)',
                opacity: darkMode ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </button>

          <Link
            to="/contacto"
            onClick={() => setOpen(false)}
            className="hidden md:flex items-center px-4 h-8 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: darkMode ? '#ffffff' : '#111111',
              color: darkMode ? '#111111' : '#ffffff',
            }}
          >
            Contactar
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            style={{ color: darkMode ? 'white' : '#111' }}
          >
            <span className={`block w-4 h-0.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}
              style={{ background: 'currentColor' }} />
            <span className={`block w-4 h-0.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`}
              style={{ background: 'currentColor' }} />
            <span className={`block w-4 h-0.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}
              style={{ background: 'currentColor' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-16 left-4 right-4 rounded-2xl border overflow-hidden transition-all duration-300 ${open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{
          background: darkMode ? 'rgba(15,15,15,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <ul className="px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNav(e, item.href, item.isRoute)}
                className="block px-3 py-2 rounded-xl text-sm transition-colors duration-200"
                style={{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-center transition-colors duration-200"
              style={{ background: darkMode ? '#ffffff' : '#111', color: darkMode ? '#111' : '#fff' }}
            >
              Contactar
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}