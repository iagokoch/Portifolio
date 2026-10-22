import { Button } from './components/ui/Button'
import { IKTile } from './components/ui/IKTile'
import { PixelGrid } from './components/ui/PixelGrid'
import { Section } from './components/ui/Section'
import { SectionHeader } from './components/ui/SectionHeader'
import { Tag } from './components/ui/Tag'
import { useLang } from './i18n/LangContext'
import { AVATAR_CELLS, CHECK, cells, ICON_PALETTE, ICONS } from './lib/pixels'
import { useTheme } from './theme/ThemeContext'

// Amostra temporária dos primitivos: some quando a navbar e o hero entrarem
function App() {
  const { t, lang, setLang } = useLang()
  const { toggleTheme } = useTheme()

  return (
    <div className="site-root min-h-screen">
      <Section innerClassName="flex flex-col gap-8">
        <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} balance aside={<span className="font-mono text-[13px] text-muted">{t.projects.count}</span>} />
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" href="#a">{t.hero.cta} ↓</Button>
          <Button size="md">{t.contact.whatsapp}</Button>
          <Button variant="secondary" size="sm">{t.projects.demo}</Button>
          <Button variant="outline-accent" size="xs" onClick={toggleTheme}>{t.nav.themeTitle}</Button>
          <Button variant="secondary" size="xs" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>{lang.toUpperCase()}</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <IKTile size={64} fontSize={28} raised large />
          <IKTile size={38} fontSize={16} raised />
          <IKTile size={28} fontSize={11} />
          <Tag variant="soft">{t.projects.items.microlearn.status}</Tag>
          <Tag variant="accent">{t.projects.items.orders.status}</Tag>
          <Tag>Node.js</Tag>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <PixelGrid cells={AVATAR_CELLS} cols={48} size={288} />
          {(Object.keys(ICONS) as Array<keyof typeof ICONS>).map((k) => (
            <PixelGrid key={k} cells={cells(ICONS[k], ICON_PALETTE)} cols={8} size={32} />
          ))}
          <PixelGrid cells={cells(CHECK, ICON_PALETTE)} cols={8} size={32} />
        </div>
      </Section>
    </div>
  )
}

export default App
