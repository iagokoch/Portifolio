import { Navigate, Route, Routes } from 'react-router'
import { ScrollManager } from './components/ScrollManager'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { Footer } from './sections/Footer'
import { Navbar } from './sections/Navbar'

function App() {
  return (
    <div className="site-root min-h-screen overflow-x-clip">
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
