import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'


export default function Footer({ darkMode }) {
  const bg = darkMode ? '#080808' : '#f5f0e8'
  const text = darkMode ? '#f5f5f5' : '#1f1f1f'
  const muted = darkMode ? '#a1a1aa' : '#6b7280'
  const borderSoft = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const dotColor = darkMode ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)'
  const socialBg = darkMode ? '#111111' : '#ffffff'


  const navLinks = [
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Sobre mí', href: '/#about' },
    { label: 'Servicios', href: '/#services' },
    { label: 'Contacto', href: '/contacto' },
  ]


  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com/profile.php?id=61568386426077', label: 'Facebook' },
    { icon: FaWhatsapp, href: 'https://wa.me/51935044351', label: 'WhatsApp' },
    { icon: FaInstagram, href: 'https://instagram.com/sf_ripvanwinkle', label: 'Instagram' },
  ]


  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        background: bg,
        color: text,
        marginTop: '4rem'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3.5rem 1.5rem 2rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <a
            href="/"
            style={{
              color: text,
              textDecoration: 'none',
              fontSize: '1.6rem',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              textShadow: 'none'
            }}
          >
            Jorgito
          </a>


          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.4rem'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: muted,
                  textDecoration: 'none',
                  fontSize: '0.96rem',
                  transition: 'all 0.25s ease',
                  textShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = text
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = muted
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>


        <div
          style={{
            margin: '2.4rem 0 1.8rem',
            height: '1px',
            backgroundImage: `radial-gradient(circle, ${dotColor} 1.2px, transparent 1.2px)`,
            backgroundSize: '10px 1px',
            backgroundRepeat: 'repeat-x'
          }}
        />


        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <p
            style={{
              margin: 0,
              color: muted,
              fontSize: '0.9rem',
              textShadow: 'none'
            }}
          >
            © 2026 Jorgito. Todos los derechos reservados.
          </p>


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: text,
                  background: socialBg,
                  border: `1px solid ${borderSoft}`,
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                  boxShadow: 'none',
                  filter: 'none',
                  textShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.background = darkMode ? '#181818' : '#f8f8f8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = socialBg
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
