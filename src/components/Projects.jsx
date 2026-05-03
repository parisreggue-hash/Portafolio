import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../theme'

const projects = [
  {
    number: '01', title: 'Hunder SRL', year: '2024',
    description: 'Página web corporativa para empresa de maquinaria agrícola e industrial. Catálogo de productos con filtros por categoría, diseño minimalista y totalmente responsive.',
    tags: ['React', 'Vite', 'CSS Modules'], color: '#12c352', link: '#',
  },
  {
    number: '02', title: 'Tienda Virtual', year: '2024',
    description: 'E-commerce visual con catálogo de productos, filtros, buscador, carrito de compras y diseño moderno adaptado a celular y computadora.',
    tags: ['React', 'React Router', 'Context API', 'CSS Modules'], color: '#7c3aed', link: '#',
  },
]

export default function Projects({ darkMode }) {
  const m = t(darkMode)
  const [active, setActive] = useState(0)
   const navigate = useNavigate()
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible')
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const p = projects[active]

  return (
    <section id="proyectos" className="relative overflow-hidden transition-colors duration-500" style={{ paddingTop: '120px', paddingBottom: '80px' }} >
     <div  className="max-w-7xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">Proyectos</span>
            <span className="text-xs font-body transition-colors duration-500" style={{ color: m.textFaint }}>{projects.length} trabajos</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-px rounded-2xl overflow-hidden border min-h-[520px] transition-colors duration-500"
            style={{ borderColor: m.border, background: m.border }}>

            {/* LEFT */}
            <div className="relative p-10 flex flex-col justify-between overflow-hidden transition-colors duration-500"
              style={{ background: darkMode ? `linear-gradient(135deg, #0d0d0d 0%, ${p.color}10 100%)` : `linear-gradient(135deg, #f0ebe0 0%, ${p.color}15 100%)` }}>
              <span className="absolute -bottom-4 -right-4 font-display font-black select-none pointer-events-none leading-none transition-colors duration-500"
                style={{ fontSize: 'clamp(8rem, 15vw, 14rem)', color: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>{p.number}</span>
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ background: p.color }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-xs font-body tracking-widest transition-colors duration-500" style={{ color: m.textFaint }}>{p.year}</span>
                </div>
                <h3 className="font-display font-black leading-[0.9] mb-6 transition-colors duration-500"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: m.text }}>{p.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-8 max-w-sm transition-colors duration-500"
                  style={{ color: m.textMuted }}>{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-xl text-xs font-body border backdrop-blur-sm"
                      style={{ borderColor: `${p.color}40`, color: p.color, background: `${p.color}10` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a href={p.link}
                className="relative z-10 inline-flex items-center gap-2 text-sm font-medium self-start px-6 py-3 rounded-xl border transition-all duration-200 group backdrop-blur-md"
                style={{ borderColor: `${p.color}50`, color: p.color, background: `${p.color}08` }}
                onMouseEnter={e => e.currentTarget.style.background = `${p.color}18`}
                onMouseLeave={e => e.currentTarget.style.background = `${p.color}08`}>
                Ver proyecto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>

            {/* RIGHT */}
            <div className="p-10 flex flex-col justify-center transition-colors duration-500"
              style={{ background: darkMode ? '#0a0a0a' : '#ede8dd' }}>
              <p className="text-xs font-body tracking-widest uppercase mb-8 transition-colors duration-500"
                style={{ color: m.textFaint }}>Todos los proyectos</p>
              <div className="space-y-2">
                {projects.map((proj, i) => (
                  <button key={proj.number} onClick={() => setActive(i)}
                    className="w-full text-left group flex items-center justify-between p-5 rounded-xl border transition-all duration-300"
                    style={{
                      borderColor: active === i ? m.border2 : 'transparent',
                      background: active === i ? m.surface2 : 'transparent',
                    }}>
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-xs transition-colors duration-500" style={{ color: m.textFaint }}>{proj.number}</span>
                      <div>
                        <p className="font-display font-bold transition-colors duration-200"
                          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: active === i ? m.text : m.textMuted }}>{proj.title}</p>
                        <p className="text-xs font-body mt-1 transition-colors duration-500" style={{ color: m.textFaint }}>{proj.year}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ borderColor: `${proj.color}60`, color: proj.color, opacity: active === i ? 1 : 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-10 border-t transition-colors duration-500" style={{ borderColor: m.divider }}>
                <p className="text-xs font-body transition-colors duration-500" style={{ color: m.textFaint }}>¿Tienes un proyecto en mente?</p>
                <a
                  onClick={() => navigate('/contacto')}
                  className="inline-flex items-center gap-2 mt-2 text-[#12c352] text-sm font-medium hover:gap-3 transition-all duration-200 cursor-pointer">
                  Hablemos →
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
