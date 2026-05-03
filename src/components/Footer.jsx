import { t } from '../theme'

export default function Footer({ darkMode }) {
  const m = t(darkMode)
  return (
    <footer className="py-8 border-t transition-colors duration-500" style={{ borderColor: m.divider }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-[#12c352] text-sm">Jorgito</span>
        <p className="font-body text-xs transition-colors duration-500" style={{ color: m.text }}>
          © {new Date().getFullYear()} — Diseñado por Jorgito
        </p>
      </div>
    </footer>
  )
}
