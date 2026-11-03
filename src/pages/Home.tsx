import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLang } from '../i18n/useLang'
import { About } from '../sections/about/About'
import { Contact } from '../sections/contact/Contact'
import { Heatmap } from '../sections/heatmap/Heatmap'
import { Hero } from '../sections/hero/Hero'
import { Projects } from '../sections/projects/Projects'
import { SideRail } from '../sections/SideRail'
import { Skills } from '../sections/Skills'

export function Home() {
  const { t } = useLang()
  useDocumentTitle(t.meta.title)

  return (
    <>
      <SideRail />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Heatmap />
        <Contact />
      </main>
    </>
  )
}
