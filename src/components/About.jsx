import SplitText from './SplitText'
import TiltedCard from './TiltedCard'
import LogoLoop from './LogoLoop'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../theme'

export default function About({ darkMode }) {
  const m = t(darkMode)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible')
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="sobre-mi" className="relative py-32 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>
          <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">Sobre mí</span>

          <div className="grid lg:grid-cols-2 gap-16 mt-10 items-center">

            {/* Left */}
            <div>
  <h2
    className="font-display font-black leading-[0.9] mb-8 transition-colors duration-500 text-left"
    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: m.text }}
  >
    Desarrollador<br />
    <span style={{ color: '#12c352' }}>obsesionado por los</span><br />
    detalles extremos.
  </h2>

<SplitText
  text="Te saluda un amante de la música y lo llamativo. Estoy aprendiendo a crear páginas web, espero poder aprender juntos. Me enfoco en que tu página sea distinta y única, con un diseño brutal."
  tag="p"
  textAlign="left"
  className="w-full font-body text-base leading-relaxed mb-4 transition-colors duration-500 text-left"
  delay={60}
  duration={1.4}
  ease="power2.out"
  splitType="words"
  from={{ opacity: 0, y: 16 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-80px"
  style={{ color: m.aboutText }}
/>

<SplitText
  text="Estoy aquí para ayudarte y hacer notar tu página web. Sigo aprendiendo cada día más y deseando aplicar lo aprendido en proyectos reales, desde lo más básico hasta lo más complejo."
  tag="p"
  textAlign="left"
  className="w-full font-body text-base leading-relaxed transition-colors duration-500 text-left"
  delay={60}
  duration={1.4}
  ease="power2.out"
  splitType="words"
  from={{ opacity: 0, y: 16 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-80px"
  style={{ color: m.aboutText }}
/>

  <div className="flex items-center gap-4 mt-10">
    <a
      onClick={() => navigate('/contacto')}
      className="px-6 py-3 rounded-xl bg-[#12c352] text-[#080808] font-semibold text-sm hover:bg-[#0fa844] transition-all duration-200 cursor-pointer"
    >
      Contáctame
    </a>

    <button
  type="button"
  onClick={() => navigate('/proyectos')}
  className="px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 backdrop-blur-md cursor-pointer"
  style={{ background: m.btnGlass, borderColor: m.btnBorder, color: m.btnText }}
>
  Ver proyectos
</button>
  </div>
</div>

            {/* Right — foto */}
            <div className="flex justify-center mt-8 lg:mt-0">
              <TiltedCard
                imageSrc="/jorgito.jpeg"
                altText="Mi foto"
                captionText="Jorgito CT"
                className="w-64 h-80"
              />
            </div>

          </div>

          {/* LogoLoop — FUERA del grid */}
          <div className="mt-20">
            <LogoLoop darkMode={darkMode} />
          </div>

        </div>
      </div>
    </section>
  )
}