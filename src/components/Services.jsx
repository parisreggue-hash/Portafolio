import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom' 
import { t } from '../theme'

const services = [
  { icon: '◈', title: 'Páginas Web', desc: 'Landing pages y sitios corporativos modernos, rápidos y responsive con React y Vite.', price: 'Desde $150' },
  { icon: '◉', title: 'Tiendas Online', desc: 'E-commerce con catálogo de productos, carrito y diseño profesional.', price: 'Desde $300' },
  { icon: '◐', title: 'Portafolios', desc: 'Portafolio profesional que destaca tu trabajo con animaciones y diseño único.', price: 'Desde $100' },
  { icon: '◎', title: 'Optimización', desc: 'Mejora de rendimiento, SEO y diseño de páginas existentes.', price: 'Desde $80' },
]

export default function Services({ darkMode }) {
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
    <section id="servicios" className="relative py-32 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>
          <div className="flex items-center justify-between mb-16">
            <div>
              <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">Servicios</span>
              <h2 className="font-display font-black mt-2 transition-colors duration-500"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: m.text }}>Qué ofrezco</h2>
            </div>
            <a
           onClick={() => navigate('/contacto')}
           className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 backdrop-blur-md cursor-pointer"
            style={{ background: m.btnGlass, borderColor: m.btnBorder, color: m.btnText }}
             onMouseEnter={e => { e.currentTarget.style.background = m.surface2; e.currentTarget.style.color = m.text }}
            onMouseLeave={e => { e.currentTarget.style.background = m.btnGlass; e.currentTarget.style.color = m.btnText }}>
             Solicitar presupuesto →
           </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div key={i}
                className="group relative p-6 rounded-2xl border transition-all duration-300 cursor-default"
                style={{ background: m.surface, borderColor: m.border }}
                onMouseEnter={e => e.currentTarget.style.background = m.surface2}
                onMouseLeave={e => e.currentTarget.style.background = m.surface}>
                <span className="text-2xl mb-4 block text-[#12c352]">{s.icon}</span>
                <h3 className="font-display font-bold text-lg mb-2 transition-colors duration-500" style={{ color: m.text }}>{s.title}</h3>
                <p className="text-sm font-body leading-relaxed mb-6 transition-colors duration-500" style={{ color: m.textMuted }}>{s.desc}</p>
                <span className="text-[#12c352] text-xs font-medium font-body">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
