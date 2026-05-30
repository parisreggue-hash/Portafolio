import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Ballpit from './Ballpit'
import { t } from '../theme'

export default function BallpitSection({ darkMode }) {
  const m = t(darkMode)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: m.bg,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Ballpit darkMode={darkMode} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        pointerEvents: 'none',
        padding: '0 1.5rem',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: m.accent,
            marginBottom: '0.75rem',
            fontWeight: 500,
          }}
        >
          Interacción
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            color: m.text,
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          ¿No te parece impresionante?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.22 }}
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: m.textMuted,
            maxWidth: '38ch',
          }}
        >
          Cada detalle está construido con intención. Mueve el cursor y descúbrelo.
        </motion.p>
      </div>
    </section>
  )
}