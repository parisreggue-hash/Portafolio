import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { t } from '../theme'

const navItems = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '/proyectos', isRoute: true },
  { label: 'Servicios', href: '#services' },
]

export default function Navbar({ darkMode, onToggle }) {
  const m = t(darkMode)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (e, href, isRoute = false) => {
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
      }, 120)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const shellStyle = {
    background: open
      ? darkMode
        ? 'rgba(16,16,16,0.42)'
        : 'rgba(255,255,255,0.20)'
      : scrolled
        ? darkMode
          ? 'rgba(18,18,18,0.52)'
          : 'rgba(255,255,255,0.30)'
        : 'transparent',

    backdropFilter: open
      ? 'blur(32px) saturate(160%)'
      : scrolled
        ? 'blur(28px) saturate(150%)'
        : 'blur(0px)',

    WebkitBackdropFilter: open
      ? 'blur(32px) saturate(160%)'
      : scrolled
        ? 'blur(28px) saturate(150%)'
        : 'blur(0px)',

    border: 'none',

    boxShadow: open || scrolled
      ? darkMode
        ? '0 14px 40px rgba(0,0,0,0.28)'
        : '0 14px 40px rgba(0,0,0,0.10)'
      : 'none',
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <div
        className="w-full transition-all duration-300 ease-out"
        style={{
          ...shellStyle,
          maxWidth: scrolled && !open ? '780px' : '880px',
          borderRadius: scrolled || open ? '18px' : '20px',
        }}
      >
        <nav
          className="flex items-center justify-between transition-all duration-300 ease-out"
          style={{
            height: scrolled ? '58px' : '64px',
            paddingLeft: scrolled ? '14px' : '16px',
            paddingRight: scrolled ? '14px' : '16px',
          }}
        >
          <a
            href="#inicio"
            onClick={(e) => handleNav(e, '#inicio')}
            className="flex items-center gap-2 shrink-0"
          >
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: '30px',
                height: '30px',
                background: m.accent,
                boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                <text
                  x="16"
                  y="22"
                  fontFamily="monospace"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill={darkMode ? '#0b0b0b' : '#f4efe7'}
                >
                  {'</>'}
                </text>
              </svg>
            </div>

            <span
              className="text-sm font-semibold tracking-tight"
              style={{ color: m.text }}
            >
              jorg
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href, item.isRoute)}
                className="inline-flex items-center justify-center rounded-xl px-4 text-sm font-medium transition-all duration-200"
                style={{
                  height: '40px',
                  color: darkMode ? 'rgba(255,255,255,0.72)' : 'rgba(20,20,20,0.72)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = m.text
                  e.currentTarget.style.background = darkMode
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.24)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = darkMode ? 'rgba(255,255,255,0.72)' : 'rgba(20,20,20,0.72)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={onToggle}
              aria-label="Cambiar modo"
              className="relative inline-flex items-center justify-center rounded-xl transition-all duration-300"
              style={{
                width: '40px',
                height: '40px',
                marginLeft: '6px',
                color: m.text,
                background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.30)',
                border: darkMode
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(255,255,255,0.35)',
              }}
            >
              <Sun
                size={17}
                className="absolute transition-all duration-300"
                style={{
                  transform: darkMode ? 'scale(0.5) rotate(-20deg)' : 'scale(1) rotate(0deg)',
                  opacity: darkMode ? 0 : 1,
                }}
              />
              <Moon
                size={17}
                className="absolute transition-all duration-300"
                style={{
                  transform: darkMode ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(20deg)',
                  opacity: darkMode ? 1 : 0,
                }}
              />
            </button>

            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-2xl px-5 text-sm font-semibold transition-all duration-200"
              style={{
                height: '40px',
                marginLeft: '8px',
                background: '#ffffff',
                color: '#111111',
                boxShadow: '0 1px 0 rgba(255,255,255,0.35) inset',
              }}
            >
              Contactar
            </Link>
          </div>

          <button
            className="md:hidden flex items-center justify-center rounded-xl transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            style={{
              width: '40px',
              height: '40px',
              color: m.text,
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.30)',
              border: darkMode
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(255,255,255,0.35)',
            }}
          >
            <div className="relative w-4 h-4">
              <span
                className="absolute left-0 top-[3px] block h-0.5 w-4 transition-all duration-300"
                style={{
                  background: 'currentColor',
                  transform: open ? 'rotate(45deg) translateY(4px)' : 'rotate(0deg)',
                }}
              />
              <span
                className="absolute left-0 top-[7px] block h-0.5 w-4 transition-all duration-300"
                style={{
                  background: 'currentColor',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="absolute left-0 top-[11px] block h-0.5 w-4 transition-all duration-300"
                style={{
                  background: 'currentColor',
                  transform: open ? 'rotate(-45deg) translateY(-4px)' : 'rotate(0deg)',
                }}
              />
            </div>
          </button>
        </nav>

        <div
          className="md:hidden transition-all duration-300"
          style={{
            display: open ? 'block' : 'none',
            padding: '0 14px 14px 14px',
          }}
        >
          <div
            style={{
              borderTop: darkMode
                ? '1px solid rgba(255,255,255,0.08)'
                : '1px solid rgba(255,255,255,0.35)',
              paddingTop: '12px',
            }}
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href, item.isRoute)}
                  className="inline-flex items-center justify-start rounded-xl px-4 text-sm font-medium transition-colors"
                  style={{
                    height: '42px',
                    color: m.text,
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.28)',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={onToggle}
                className="inline-flex items-center justify-center rounded-xl px-4 text-sm font-medium transition-colors"
                style={{
                  height: '42px',
                  color: m.text,
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.28)',
                }}
              >
                {darkMode ? 'Modo claro' : 'Modo oscuro'}
              </button>

              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-colors"
                style={{
                  height: '42px',
                  background: '#ffffff',
                  color: '#111111',
                }}
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}