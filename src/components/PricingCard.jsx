import { motion } from 'framer-motion'

export default function PricingCard({
  title,
  description,
  imageUrl,
  href = '#contact',
  className = '',
  darkMode = false,
}) {
  const isDark = darkMode

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -5,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-80 w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12c352] focus-visible:ring-offset-2 ${className}`}
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
        borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
      }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      aria-label={`Link to ${title}`}
    >
      <div className="z-10">
        <h3
          className="mb-2 font-serif text-3xl font-medium tracking-tight"
          style={{ color: isDark ? '#f5f5f5' : '#111111' }}
        >
          {title}
        </h3>
        <p
          className="max-w-[80%] text-sm"
          style={{ color: isDark ? 'rgba(255,255,255,0.72)' : 'rgba(17,17,17,0.72)' }}
        >
          {description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 h-40 w-40">
        <motion.img
          src={imageUrl}
          alt={`${title} illustration`}
          className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>
    </motion.a>
  )
}