import SplitText from './SplitText'
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
    <section
      id="about"
      ref={ref}
      className="w-full px-6 md:px-10 lg:px-16 py-20 md:py-24"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 md:gap-8">

          <span
            className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium tracking-[0.12em] uppercase"
            style={{
              background: m.accentSoft,
              color: m.accent,
              border: `1px solid ${darkMode ? 'rgba(131,160,201,0.18)' : 'rgba(74,111,160,0.18)'}`,
            }}
          >
            ¿Quién soy?
          </span>

          <SplitText
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight"
            style={{ color: m.text }}
          >
            Desarrollo interfaces limpias, rápidas y con intención.
          </SplitText>

          <div className="flex flex-col gap-5">
            <p
              className="text-base md:text-lg leading-8 max-w-3xl"
              style={{ color: m.aboutText }}
            >
              Soy desarrollador frontend y disfruto construir experiencias web que se sientan
              claras, fluidas y bien cuidadas. Me interesa combinar diseño, rendimiento y
              atención al detalle para crear interfaces que no solo se vean bien, sino que
              también se sientan bien al usarlas.
            </p>

            <p
              className="text-base md:text-lg leading-8 max-w-3xl"
              style={{ color: m.aboutText }}
            >
              Trabajo principalmente con React, JavaScript y herramientas modernas del ecosistema
              frontend. Me gusta iterar, pulir microdetalles visuales y convertir ideas en
              productos funcionales con una estética sólida y una experiencia consistente.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {[
              'React',
              'JavaScript',
              'UI / UX',
              'Animaciones',
              'Componentes reutilizables',
              'Frontend moderno',
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: m.surface2,
                  border: `1px solid ${m.border}`,
                  color: m.text,
                  backdropFilter: darkMode ? 'blur(10px)' : 'none',
                  WebkitBackdropFilter: darkMode ? 'blur(10px)' : 'none',
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap pt-2">
            <button
              onClick={() => navigate('/contacto')}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
              style={{
                background: m.accent,
                color: darkMode ? '#0b0b0b' : '#f4efe7',
              }}
            >
              Contáctame
            </button>

            <button
              onClick={() => navigate('/proyectos')}
              className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: m.btnGlass,
                border: `1px solid ${m.btnBorder}`,
                color: m.btnText,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              Ver proyectos
            </button>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <LogoLoop darkMode={darkMode} />
        </div>
      </div>
    </section>
  )
}