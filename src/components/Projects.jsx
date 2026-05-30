import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from '../theme'

const project = {
  title: 'Mi portafolio personal',
  description:
    'Un portafolio desarrollado para mostrar mi trabajo, mis habilidades y mi enfoque en interfaces modernas, rendimiento y detalles visuales bien cuidados.',
  stack: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  liveUrl: 'https://dev-jorg.vercel.app/',
  previewImage: '/casalander.png',
}

export default function Projects({ darkMode }) {
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

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden transition-colors duration-500"
      style={{ paddingTop: '120px', paddingBottom: '100px' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-reveal" ref={ref}>

          {/* Header */}
          <div className="mb-14 flex flex-col items-center text-center gap-4">
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase font-body"
              style={{ color: m.accent }}
            >
              Proyectos
            </span>

            <h2
              className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl"
              style={{ color: m.text }}
            >
              Un proyecto que resume cómo diseño y construyo experiencias web.
            </h2>

            <p
              className="max-w-2xl text-sm md:text-base leading-7"
              style={{ color: m.textMuted }}
            >
              Por ahora estoy mostrando mi propio portfolio como proyecto principal, con foco en
              interfaz, microdetalles, rendimiento y consistencia visual.
            </p>
          </div>

          {/* Article */}
          <article className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">

            {/* Left — texto */}
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <span
                className="text-xs uppercase tracking-[0.18em] font-medium"
                style={{ color: m.accent }}
              >
                {project.tag}
              </span>

              <div className="flex flex-col gap-4">
                <h3
                  className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"
                  style={{ color: m.text }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm md:text-base leading-7 max-w-xl"
                  style={{ color: m.textMuted }}
                >
                  {project.description}
                </p>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-x-4 gap-y-3 pt-1">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-medium"
                    style={{ color: m.textSub ?? m.textMuted }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
                  style={{ color: m.text }}
                >
                  <span>Ver proyecto</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            {/* Right — imagen */}
            <div className="order-1 lg:order-2">
              <div
                className="w-full overflow-hidden rounded-[28px]"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  boxShadow: darkMode
                    ? '0 18px 50px rgba(0,0,0,0.22)'
                    : '0 18px 45px rgba(0,0,0,0.08)',
                }}
              >
                <div className="w-full overflow-hidden rounded-[28px] aspect-[16/9]">
                  <img
                    src={project.previewImage}
                    alt="Vista previa del portfolio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </article>
        </div>
      </div>
    </section>
  )
}