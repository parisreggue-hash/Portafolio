import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const bg = darkMode ? '#080808' : '#f5f0e8'

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-500" style={{ background: bg }}>
      <Navbar darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      <Routes>

        <Route path="/proyectos" element={
  <main>
    <Projects darkMode={darkMode} />
  </main>
} />

        {/* Página principal */}
        <Route path="/" element={
          <main>
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            
            <Services darkMode={darkMode} />
          </main>
        } />

        {/* Página de contacto */}
        <Route path="/contacto" element={
          <main>
            <Contact darkMode={darkMode} />
          </main>
        } />

      </Routes>
      <Footer darkMode={darkMode} />
    </div>
  )
}