import { useEffect, useRef } from 'react'
import { t } from '../theme'
import LightRays from './LightRays/LightRays';

export default function Contact({ darkMode }) {
  const m = t(darkMode)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible')
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const whatsapp = 'https://wa.me/51935044351'
  const instagram = 'https://instagram.com/sf_ripvanwinkle'

  return (
    <section id="contacto" className="relative py-32 overflow-hidden transition-colors duration-500">

      {/* ✅ LightRays como fondo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#12c352"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={2}
          fadeDistance={1.0}
          followMouse={true}
          mouseInfluence={0.15}
        />
      </div>

      {/* Blur verde que ya tenías (opcional, puedes quitarlo) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: '#12c352' }} />
      </div>

      {/* ✅ Contenido encima, zIndex: 1 */}
      <div className="max-w-4xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-reveal" ref={ref}>
          <span className="text-[#12c352] text-xs font-medium tracking-[0.2em] uppercase font-body">Contacto</span>
          <h2 className="font-display font-black leading-tight mt-4 mb-4 transition-colors duration-500"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: m.text }}>
            Trabajemos<br />
            <span style={{ color: '#12c352', textShadow: m.accentGlow }}>juntos.</span>
          </h2>
          <p className="font-body text-base max-w-md mx-auto leading-relaxed mb-12 transition-colors duration-500"
            style={{ color: m.textMuted }}>
            ¿Tienes un proyecto en mente? Escríbeme y te respondo lo antes posible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#12c352] text-[#080808] font-semibold text-sm hover:bg-[#0fa844] transition-all duration-200 hover:shadow-[0_0_40px_rgba(18,195,82,0.4)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl border font-medium text-sm transition-all duration-200 backdrop-blur-md"
              style={{ background: m.btnGlass, borderColor: m.btnBorder, color: m.btnText }}
              onMouseEnter={e => { e.currentTarget.style.background = m.surface2; e.currentTarget.style.color = m.text }}
              onMouseLeave={e => { e.currentTarget.style.background = m.btnGlass; e.currentTarget.style.color = m.btnText }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}