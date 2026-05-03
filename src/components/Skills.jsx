import { useEffect, useRef } from 'react'
import { t } from '../theme'

const skills = [
  { name: 'React', level: 85 }, { name: 'JavaScript', level: 80 },
  { name: 'CSS / Tailwind', level: 90 }, { name: 'Vite', level: 85 },
  { name: 'HTML', level: 95 }, { name: 'Git / GitHub', level: 75 },
  { name: 'Responsive Design', level: 90 }, { name: 'EmailJS', level: 70 },
]

export default function Skills({ darkMode }) {
  const m = t(darkMode)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible')
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="habilidades" className="relative py-32 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>
          <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">Habilidades</span>
          <h2 className="font-display font-black mt-2 mb-16 transition-colors duration-500"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: m.text }}>
            Tecnologías
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-body text-sm font-medium transition-colors duration-500" style={{ color: m.text }}>{s.name}</span>
                  <span className="font-body text-xs transition-colors duration-500" style={{ color: m.textMuted }}>{s.level}%</span>
                </div>
                <div className="h-1.5 rounded-full transition-colors duration-500" style={{ background: m.border2 }}>
                  <div className="h-full rounded-full bg-[#12c352] transition-all duration-1000"
                    style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
