import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../theme'

const services = [
  {
    title: 'Web Básica',
    price: 'Desde $119',
    description:
      'Landing pages y sitios informativos modernos, rápidos y funcionales para mostrar tu negocio o marca personal de forma clara.',
    points: ['Diseño responsive', 'Carga rápida', 'Secciones esenciales', 'Botón de contacto o WhatsApp'],
    href: '/contacto',
  },
  {
    title: 'Tienda Virtual',
    price: 'Cotización personalizada',
    description:
      'E-commerce completo con catálogo, carrito y una experiencia pensada para vender mejor desde cualquier dispositivo.',
    points: ['Catálogo de productos', 'Carrito de compras', 'Diseño profesional', 'Base lista para crecer'],
    href: '/contacto',
  },
  {
    title: 'Web Premium',
    price: 'Proyecto a medida',
    description:
      'Sitio completo y personalizado con diseño profesional, optimización, integraciones y funciones más avanzadas.',
    points: ['Diseño a medida', 'Más secciones e interacciones', 'Optimización visual y técnica', 'Integraciones según necesidad'],
    href: '/contacto',
  },
]

export default function Services({ darkMode }) {
  const m = t(darkMode)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('visible') },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const cardStyle = {
    background: m.cardGlass,
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${m.cardBorder}`,
    boxShadow: 'none',
  }

  return (
    <section
      id="services"
      ref={ref}
      className="px-6 md:px-10 lg:px-14 py-28 md:py-36 opacity-0 translate-y-8 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <p
              className="text-xs font-medium tracking-[0.22em] uppercase mb-4"
              style={{ color: m.textMuted }}
            >
              Servicios
            </p>
            <h2
              className="font-display font-black tracking-tight leading-none text-4xl md:text-6xl"
              style={{ color: m.text }}
            >
              ¿Qué te puedo ofrecer?
            </h2>
          </div>

          <button
            onClick={() => navigate('/contacto')}
            className="hidden md:flex items-center gap-2 px-6 h-12 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ ...cardStyle, color: m.btnText }}
          >
            Solicitar presupuesto →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="rounded-[24px] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1"
              style={cardStyle}
            >
              <div className="flex items-start justify-between gap-4 mb-8">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] tracking-[0.18em] uppercase"
                  style={{
                    background: m.cardGlass,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: `1px solid ${m.cardBorder}`,
                    color: m.accent,
                  }}
                >
                  0{i + 1}
                </span>

                <span
                  className="text-xs uppercase tracking-[0.18em]"
                  style={{ color: m.textMuted }}
                >
                  {s.price}
                </span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
                style={{ color: m.text }}
              >
                {s.title}
              </h3>

              <p
                className="text-sm leading-7 mb-7"
                style={{ color: m.textMuted }}
              >
                {s.description}
              </p>

              <div className="space-y-3 mb-8">
                {s.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                      style={{ background: m.accent }}
                    />
                    <p className="text-sm leading-6" style={{ color: m.textMuted }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(s.href)}
                className="w-full flex items-center justify-center px-5 h-12 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ ...cardStyle, color: m.btnText }}
              >
                Quiero este servicio →
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <button
            onClick={() => navigate('/contacto')}
            className="w-full flex items-center justify-center gap-2 px-6 h-12 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ ...cardStyle, color: m.btnText }}
          >
            Solicitar presupuesto →
          </button>
        </div>
      </div>
    </section>
  )
}