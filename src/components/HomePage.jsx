import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import BackgroundRipple from '../components/BackgroundRipple'

export default function HomePage({ darkMode }) {
  return (
    <main style={{ position: 'relative' }}>
      <BackgroundRipple darkMode={darkMode} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Services darkMode={darkMode} />
      </div>
    </main>
  )
}