import { About } from './sections/about/About'
import { Contact } from './sections/contact/Contact'
import { Footer } from './sections/Footer'
import { Heatmap } from './sections/heatmap/Heatmap'
import { Hero } from './sections/hero/Hero'
import { Navbar } from './sections/Navbar'
import { Projects } from './sections/projects/Projects'
import { SideRail } from './sections/SideRail'
import { Skills } from './sections/Skills'

function App() {
  return (
    <div className="site-root min-h-screen">
      <Navbar />
      <SideRail />
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
