import { useRef, useState } from 'react'

export default function TiltedCard({
  imageSrc,
  altText = 'foto',
  captionText = '',
  tiltMaxAngle = 15,
  scaleOnHover = 1.05,
  className = '',
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const card = ref.current
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left
    const y = e.clientY - box.top
    const centerX = box.width / 2
    const centerY = box.height / 2
    const rotateX = ((y - centerY) / centerY) * tiltMaxAngle
    const rotateY = ((centerX - x) / centerX) * tiltMaxAngle
    setRotate({ x: rotateX, y: rotateY })
  }

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hovered ? scaleOnHover : 1})`,
        transition: 'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        willChange: 'transform',
      }}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover"
      />
      {captionText && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm text-white/80 font-body text-center"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
          {captionText}
        </figcaption>
      )}
    </div>
  )
}