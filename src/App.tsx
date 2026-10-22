import { Navbar } from './sections/Navbar'

// Temporário: seções vazias só para testar a navbar sticky e as âncoras
function App() {
  return (
    <div className="site-root min-h-screen">
      <Navbar />
      <section id="top" className="h-[600px] border-b border-border" />
      <section id="projetos" className="h-[600px] border-b border-border bg-panel" />
      <section id="sobre" className="h-[600px] border-b border-border" />
      <section id="skills" className="h-[600px] border-b border-border bg-panel" />
      <section id="contato" className="h-[600px]" />
    </div>
  )
}

export default App
