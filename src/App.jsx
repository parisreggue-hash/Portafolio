import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import BackgroundRipple from './components/BackgroundRipple'
import Footer from './components/Footer'
import ScrollToHash from './components/ScrollToHash'

export default function App() {
  const location = useLocation()
  console.log('ruta actual:', location.pathname)

  const [darkMode, setDarkMode] = useState(false)
  const bg = darkMode ? '#080808' : '#f5f0e8'

  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{ background: bg }}
    >
      <Navbar
        darkMode={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <ScrollToHash />

      <Routes>
        <Route
          path="/"
          element={
            <main style={{ position: 'relative' }}>
              <BackgroundRipple darkMode={darkMode} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Hero darkMode={darkMode} />
                <About darkMode={darkMode} />
                <Services darkMode={darkMode} />
              </div>
            </main>
          }
        />

        <Route
          path="/proyectos"
          element={
            <main>
              <Projects darkMode={darkMode} />
            </main>
          }
        />

        <Route
          path="/contacto"
          element={
            <main>
              <Contact darkMode={darkMode} />
            </main>
          }
        />
      </Routes>

      <Footer darkMode={darkMode} />
    </div>
  )
}