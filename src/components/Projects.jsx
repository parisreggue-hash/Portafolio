import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../theme'
import { Skiper52 } from './ProjectsSlider'

export default function Projects({ darkMode }) {
  const m = t(darkMode)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible')
    }, { threshold: 0.1 })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden transition-colors duration-500"
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">
              Proyectos
            </span>
            <span
              className="text-xs font-body transition-colors duration-500"
              style={{ color: m.textFaint }}
            >
              Selección visual
            </span>
          </div>

        <Skiper52 darkMode={darkMode} />

          
          
        </div>
      </div>
    </section>
  )
}