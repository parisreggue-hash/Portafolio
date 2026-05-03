import { useEffect, useRef, useState } from 'react'

export default function GooeyText({
  text,
  className = '',
  morphTime = 0.45,
  cooldownTime = 0.12,
}) {
  const [currentText, setCurrentText] = useState(text)
  const [nextText, setNextText] = useState(text)

  const requestRef = useRef(null)
  const lastTimeRef = useRef(null)
  const morphRef = useRef(0)
  const cooldownRef = useRef(cooldownTime)
  const previousTextRef = useRef(text)

  useEffect(() => {
    if (text !== previousTextRef.current) {
      setCurrentText(previousTextRef.current)
      setNextText(text)
      previousTextRef.current = text
      morphRef.current = 0
      cooldownRef.current = 0
    }
  }, [text])

  useEffect(() => {
    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) {
        morphRef.current += dt
      }

      if (morphRef.current >= morphTime) {
        morphRef.current = morphTime
        setCurrentText(text)
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(requestRef.current)
    }
  }, [text, morphTime])

  const fraction = Math.min(morphRef.current / morphTime, 1)
  const currentBlur = Math.min(8 / Math.max(1 - fraction, 0.001) - 8, 100)
  const nextBlur = Math.min(8 / Math.max(fraction, 0.001) - 8, 100)

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ filter: 'url(#gooey-filter)' }}
    >
      <svg
        aria-hidden="true"
        className="absolute w-0 h-0"
      >
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7
              "
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>

      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: 1 - fraction,
          filter: `blur(${currentBlur}px)`,
        }}
      >
        {currentText}
      </span>

      <span
        className="flex items-center justify-center"
        style={{
          opacity: fraction,
          filter: `blur(${nextBlur}px)`,
        }}
      >
        {nextText}
      </span>
    </div>
  )
}