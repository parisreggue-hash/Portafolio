import { useNavigate } from 'react-router-dom'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Ballpit from './Ballpit'
import SplitText from './SplitText'
import Aurora from './Aurora'
import BlurText from './BlurText'

const roles = ['Diseños extremos', 'Experiencias Digitales', 'Desarrollo Frontend']

export default function Hero({ darkMode }) {
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
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65)
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout.current)
  }, [displayed, deleting, roleIdx])

  const dark = {
    bg: '#000000',
    textMain: 'text-white', textMuted: 'text-white/40', textFaint: 'text-white/10',
    glow: '0 0 80px rgba(18,195,82,0.35)',
    tagBg: 'rgba(17,17,17,0.7)', tagBorder: 'rgba(255,255,255,0.08)',
    btnBg: 'rgba(255,255,255,0.06)', btnBorder: 'rgba(255,255,255,0.12)', btnText: 'rgba(255,255,255,0.6)',
  }
  const light = {
    bg: '#f5f0e8',
    textMain: 'text-[#111]', textMuted: 'text-black/40', textFaint: 'text-black/8',
    glow: 'none',
    tagBg: 'rgba(255,255,255,0.7)', tagBorder: 'rgba(0,0,0,0.08)',
    btnBg: 'rgba(0,0,0,0.04)', btnBorder: 'rgba(0,0,0,0.12)', btnText: 'rgba(0,0,0,0.6)',
  }
  const m = darkMode ? dark : light

  return (
    <div ref={containerRef} className="relative transition-colors duration-500"
      style={{ backgroundColor: m.bg, perspective: '1200px' }}>

      {/* SECCIÓN SUPERIOR — título y botones */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">

        {/* AURORA FONDO — absolute para no empujar contenido */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Aurora
            colorStops={['#bcd546', '#26982d', '#279691']}
            amplitude={1.2}
            blend={0.6}
          />
        </div>

        {/* CONTENIDO encima del Aurora */}
        <div className="relative z-10 flex flex-col items-center w-full">

          <h1 className="font-display font-black leading-[1.1] tracking-tighter select-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}>
            <div className="block">
              <SplitText
                text="DESARROLLADOR"
                tag="span"
                className="text-[#12c352]"
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
            <div className={`block ${m.textFaint}`}>
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
          <div className="hidden md:flex items-center gap-3 mt-6 rounded-xl px-5 py-4 w-fit border transition-all duration-500"
            style={{ background: m.tagBg, borderColor: m.tagBorder, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            <div>
              <p className={`${m.textMuted} text-xs font-body mb-1 tracking-widest uppercase`}>Especialidad</p>
              <p className={`${m.textMain} font-body text-sm min-h-[1.25rem]`}>
                {displayed}<span className="cursor-blink text-[#12c352]">|</span>
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
  className="px-7 py-3.5 rounded-xl bg-[#12c352] text-[#080808] font-semibold text-sm hover:bg-[#0fa844] transition-all duration-200 hover:shadow-[0_0_40px_rgba(18,195,82,0.45)] whitespace-nowrap"
>
  Ver proyectos →
</button>
              <a href="#sobre-mi"
                onClick={e => { e.preventDefault(); document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-7 py-3.5 rounded-xl border font-medium text-sm transition-all duration-300 whitespace-nowrap backdrop-blur-md"
                style={{ background: m.btnBg, borderColor: m.btnBorder, color: m.btnText }}>
                Sobre mí
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* LAPTOP MOCKUP con efecto 3D */}
      <div className="relative z-10 flex justify-center pb-32 px-6"
        style={{ perspective: '1200px' }}>
        <motion.div
          style={{ rotateX: rotate, scale, translateY, transformOrigin: 'top center', willChange: 'transform' }}
          className="w-full max-w-4xl">

          {/* CUERPO DE LA LAPTOP */}
          <div className="relative w-full rounded-t-2xl overflow-hidden border border-white/10"
            style={{ background: '#1a1a1a' }}>

            {/* BARRA DE CHROME */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10"
              style={{ background: '#2a2a2a' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-4 rounded-md px-3 py-1 text-xs text-white/40 border border-white/10"
                style={{ background: '#1a1a1a' }}>
                tufuturapaginaweb.com
              </div>
            </div>

            {/* PANTALLA */}
            <div className="relative w-full overflow-hidden" style={{ height: '480px' }}>

              {/* Ballpit sin interceptar eventos touch */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Ballpit
                  count={20}
                  gravity={0}
                  friction={0.9975}
                  wallBounce={1}
                  colors={["#84CC16", "#84CC16", "#84CC16", "#7C3AED"]}
                />
              </div>

              {/* Overlay con texto */}
<div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
  style={{ background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }}>
  
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
    className="text-[#12c352] font-display font-black mt-2 text-center w-full text-4xl md:text-6xl"
  />

</div>

            </div>
          </div>

          {/* BASE DE LA LAPTOP */}
          <div className="relative mx-auto rounded-b-xl h-4 w-full" style={{ background: '#2a2a2a' }} />
          <div className="relative mx-auto rounded-b-2xl h-3 w-3/4" style={{ background: '#222' }} />

        </motion.div>
      </div>

    </div>
  )
}