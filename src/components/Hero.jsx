import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { t } from '../theme'

import SplitText from './SplitText'
import Ballpit from './Ballpit'
import BlurText from './BlurText'

const roles = ['Diseños extremos', 'Experiencias Digitales', 'Desarrollo Frontend']

export default function Hero({ darkMode }) {
  const m = t(darkMode)
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, [0, 600], [40, 0])
  const scale = useTransform(scrollY, [0, 600], [0.75, 1])
  const translateY = useTransform(scrollY, [0, 600], [120, -60])

  useEffect(() => {
    const current = roles[roleIdx]

    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 65)
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 38)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout.current)
  }, [displayed, deleting, roleIdx])

  const scrollToAbout = () => {
    const section = document.getElementById('about')
    if (!section) return
    const y = section.getBoundingClientRect().top + window.pageYOffset - 110
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div
      id="inicio"
      ref={containerRef}
      className="relative transition-colors duration-500"
      style={{ backgroundColor: 'transparent', perspective: '1200px' }}
    >
      {/* SECCIÓN SUPERIOR */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 md:pt-32">
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1
            className="font-display font-black leading-[1.1] tracking-tighter select-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
          >
            <div className="block">
              <SplitText
                text="DESARROLLADOR"
                tag="span"
                className={darkMode ? 'text-[#83A0C9]' : 'text-[#2e527e]'}
                delay={40}
                duration={1.25}
                ease="elastic.out(1, 0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>

            <div
              className="block"
              style={{ color: darkMode ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.12)' }}
            >
              <SplitText
                text="WEB."
                tag="span"
                delay={120}
                duration={1.25}
                ease="elastic.out(1, 0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>
          </h1>

          {/* TAG TYPEWRITER */}
          <div
            className="hidden md:flex items-center gap-3 mt-6 rounded-xl px-5 py-4 w-fit border transition-all duration-500"
            style={{
              background: darkMode ? 'rgba(17,17,17,0.7)' : 'rgba(255,255,255,0.7)',
              borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div>
              <p
                className="text-xs font-body mb-1 tracking-widest uppercase"
                style={{ color: m.textMuted }}
              >
                Especialidad
              </p>
              <p
                className="font-body text-sm min-h-[1.25rem]"
                style={{ color: m.text }}
              >
                {displayed}
                <span className="cursor-blink" style={{ color: m.accent }}>|</span>
              </p>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-10">
            <p
              className="font-body text-base max-w-sm leading-relaxed text-center sm:text-left px-2"
              style={{ color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(17,17,17,0.78)' }}
            >
              Construyo páginas web modernas, rápidas y adaptadas a cualquier dispositivo.
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/proyectos')}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap"
                style={{
                  background: m.accent,
                  color: darkMode ? '#0b0b0b' : '#f4efe7',
                  boxShadow: m.accentGlow,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.88'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Ver proyectos →
              </button>

              <button
                type="button"
                onClick={scrollToAbout}
                className="px-7 py-3.5 rounded-xl border font-medium text-sm transition-all duration-300 whitespace-nowrap backdrop-blur-md"
                style={{
                  background: m.btnGlass,
                  borderColor: m.btnBorder,
                  color: m.btnText,
                }}
              >
                Sobre mí
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LAPTOP MOCKUP */}
      <div
        className="relative z-10 flex justify-center pb-32 px-6"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            translateY,
            transformOrigin: 'top center',
            willChange: 'transform',
          }}
          className="w-full max-w-4xl"
        >
          <div
            className="relative w-full rounded-t-2xl overflow-hidden border border-white/10"
            style={{ background: '#1a1a1a' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
              style={{ background: '#2a2a2a' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>

              <div
                className="flex-1 mx-4 rounded-md px-3 py-1 text-xs text-white/40 border border-white/10"
                style={{ background: '#1a1a1a' }}
              >
                tufuturapaginaweb.com
              </div>
            </div>

            <div className="relative w-full overflow-hidden" style={{ height: '480px' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Ballpit
                  count={20}
                  gravity={0}
                  friction={0.9975}
                  wallBounce={1}
                  colors={[m.accent, m.accentStrong, 'rgba(131,160,201,0.6)', '#7C3AED']}
                />
              </div>

              <div
                className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
                style={{ background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }}
              >
                <BlurText
                  text="Todo es posible"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-white/60 text-sm font-body tracking-widest uppercase text-center w-full"
                />

                <BlurText
                  text="No te parece impresionante?"
                  delay={400}
                  animateBy="words"
                  direction="top"
                  className="font-display font-black mt-2 text-center w-full text-4xl md:text-6xl"
                  style={{ color: m.accent }}
                />
              </div>
            </div>
          </div>

          <div
            className="relative mx-auto rounded-b-xl h-4 w-full"
            style={{ background: '#2a2a2a' }}
          />
          <div
            className="relative mx-auto rounded-b-2xl h-3 w-3/4"
            style={{ background: '#222' }}
          />
        </motion.div>
      </div>
    </div>
  )
}