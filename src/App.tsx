import { useLang } from './i18n/LangContext'
import { useTheme } from './theme/ThemeContext'

// Placeholder: some quando a navbar e o hero entrarem
function App() {
  const { t, lang, setLang } = useLang()
  const { toggleTheme } = useTheme()

  return (
    <div className="site-root min-h-screen p-8">
      <h1 className="font-pixel text-4xl text-accent">{t.hero.eyebrow}</h1>
      <p className="mt-4 text-muted">{t.hero.role}</p>
      <div className="mt-6 flex gap-3">
        <button onClick={toggleTheme}>{t.nav.themeTitle}</button>
        <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>{lang.toUpperCase()}</button>
      </div>
    </div>
  )
}

export default App
