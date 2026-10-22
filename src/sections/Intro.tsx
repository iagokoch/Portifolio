import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/ui/Button'
import { IKTile } from '../components/ui/IKTile'
import { useLang } from '../i18n/LangContext'

const SEGMENTS = 20
const TICK_MS = 60 // 20 × 60ms ≈ 1,2 s
const IGNORED_KEYS = ['Tab', 'Shift', 'Control', 'Alt', 'Meta']

/** Tela de boot em tela cheia. Termina sozinha ao carregar; Esc, qualquer tecla ou "Pular" encerram antes. */
export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const [filled, setFilled] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  })

  useEffect(() => {
    const id = setInterval(() => setFilled((f) => Math.min(SEGMENTS, f + 1)), TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (filled < SEGMENTS) return
    const id = setTimeout(() => doneRef.current(), 500)
    return () => clearTimeout(id)
  }, [filled])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!IGNORED_KEYS.includes(e.key)) doneRef.current()
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button')?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [])

  const i = t.intro

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={i.title}
      className="bg-grid fixed inset-0 z-50 flex flex-col overflow-auto"
    >
      <div className="flex items-center justify-between px-8 py-6 font-mono text-xs text-muted">
        <span>{i.system}</span>
        <Button variant="secondary" size="xs" onClick={() => doneRef.current()}>
          {i.skip}
          <span className="rounded-px border border-border-input px-1.5 py-0.5 font-mono text-[11px] text-muted">{i.skipKey}</span>
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center px-5">
        <div className="flex w-[min(640px,100%)] flex-col gap-7">
          <div className="flex items-center gap-[18px]">
            <IKTile size={64} fontSize={28} raised large />
            <div className="flex flex-col gap-0.5">
              <span className="font-pixel text-lg">{i.title}</span>
              <span className="font-mono text-xs text-muted">{i.version}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[15px] text-muted">
            {i.lines.map((line) => (
              <div key={line} className="flex justify-between gap-4">
                <span>&gt; {line}</span>
                <span className="text-accent">OK</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-fg">
              <span>&gt; {i.ready}</span>
              <span aria-hidden="true" className="h-[18px] w-2.5 animate-blink bg-accent" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between font-mono text-xs text-muted">
              <span>{i.loading}</span>
              <span>{i.eta}</span>
            </div>
            <div className="grid grid-cols-20 gap-1 rounded-px border border-border-input p-1">
              {Array.from({ length: SEGMENTS }, (_, n) => (
                <div key={n} className={`h-3.5 ${n < filled ? 'bg-accent' : 'bg-panel-2'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-7 text-center font-mono text-xs text-muted">{i.hint}</div>
    </div>
  )
}
