import { useState } from 'react'
import { useReducedMotion } from './hooks/useReducedMotion'
import { About } from './sections/about/About'
import { Contact } from './sections/contact/Contact'
import { Footer } from './sections/Footer'
import { Heatmap } from './sections/heatmap/Heatmap'
import { Hero } from './sections/hero/Hero'
import { Intro } from './sections/Intro'
import { Navbar } from './sections/Navbar'
import { Projects } from './sections/projects/Projects'
import { Skills } from './sections/Skills'

function App() {
  const reduced = useReducedMotion()
  const [booted, setBooted] = useState(false)
  // com movimento reduzido a tela de boot é pulada
  const showIntro = !booted && !reduced

  return (
    <div className="site-root bg-grid min-h-screen">
      {showIntro && <Intro onDone={() => setBooted(true)} />}
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Heatmap />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
