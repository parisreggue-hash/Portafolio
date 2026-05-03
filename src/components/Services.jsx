import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../theme'
import PricingCard from './PricingCard'

export default function Services({ darkMode }) {
  const m = t(darkMode)
  const navigate = useNavigate()
  const ref = useRef(null)

  const services = [
    {
      title: 'Web Básica',
      description: 'Landing pages y sitios informativos modernos, rápidos y funcionales, desde $20.',
      imageUrl: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-DtrNxOB0jqKQ31PsOtpWE6sbvajnjM.png&w=320&q=75',
      href: '/contacto',
    },
    {
      title: 'Tienda Virtual',
      description: 'E-commerce o tienda virtual completo con catálogo, carrito y diseño profesional.',
      imageUrl: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-iz7IqPk6hVuaRd4cYUxWTnK6M1CN9Q.png&w=320&q=75',
      href: '/contacto',
    },
    {
      title: 'Web Premium',
      description: 'Sitio web completo y personalizado con diseño profesional, secciones avanzadas, optimización, integraciones y funciones a medida para llevar tu negocio a un nivel más serio.',
      imageUrl: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-PBC8rCnk8vraLCfYgyCEoHw0TJSCGY.png&w=320&q=75',
      href: '/contacto',
    },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      },
      { threshold: 0.1 }
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="servicios"
      className="relative py-32 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>
          <div className="flex items-center justify-between mb-16">
            <div>
              <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">
                Servicios
              </span>
              <h2
                className="font-display font-black mt-2 transition-colors duration-500"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: m.text }}
              >
                Qué ofrezco
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 backdrop-blur-md cursor-pointer"
              style={{
                background: m.btnGlass,
                borderColor: m.btnBorder,
                color: m.btnText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = m.surface2
                e.currentTarget.style.color = m.text
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = m.btnGlass
                e.currentTarget.style.color = m.btnText
              }}
            >
              Solicitar presupuesto →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((s) => (
              <PricingCard
                key={s.title}
                title={s.title}
                description={s.description}
                imageUrl={s.imageUrl}
                href={s.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}