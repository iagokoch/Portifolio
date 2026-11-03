import { useEffect, useRef, useState } from 'react'
import { config } from '../../config'
import { useLang } from '../../i18n/useLang'
import { out, type OutLine } from '../../i18n/types'

// `welcome` não guarda texto: é traduzido na renderização, então acompanha a troca de idioma
type Line = { k: 'cmd' | 'out' | 'ok' | 'err' | 'welcome'; t: string }
const WELCOME: Line = { k: 'welcome', t: '' }

const CHIPS = ['help', 'about', 'projects', 'skills', 'contact', 'github', 'clear', 'sudo hire iago']

const COLOR: Record<Line['k'], string> = {
  cmd: 'text-ink',
  out: 'text-ink-2',
  ok: 'text-ink',
  err: 'text-error',
  welcome: 'text-ink-2',
}

export function Terminal() {
  const { t } = useLang()
  const term = t.contact.terminal
  // null = ainda sem interação: mostra a mensagem de boas-vindas no idioma atual
  const [history, setHistory] = useState<Line[] | null>(null)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const lines: Line[] = history ?? [WELCOME]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  const outputFor = (cmd: string): Line[] => {
    if (cmd === 'contact') {
      const lbl = term.contactLabels
      return [out(`${lbl.email}${config.email}`), out(`${lbl.phone}${config.phone}`)]
    }
    const known = (term.out as Record<string, OutLine[]>)[cmd]
    return known ?? [{ k: 'err', t: term.notFound(cmd) }]
  }

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setInput('')
    if (cmd === 'clear') {
      setHistory([])
      return
    }
    setHistory([...lines, { k: 'cmd', t: raw.trim() }, ...outputFor(cmd)])
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-line-soft bg-[#0a0c10] font-mono text-ink-2">
      <div className="flex justify-between border-b border-line bg-card px-4 py-2.5 text-xs">
        <span>{term.title}</span>
        <span>{term.size}</span>
      </div>

      <div className="relative min-h-[300px] flex-1 cursor-text" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className="absolute inset-0 overflow-auto px-[18px] py-4 text-sm leading-[1.7]"
        >
          {lines.map((l, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">
              {l.k === 'cmd' && <span className="text-ink">{term.prompt}</span>}
              <span className={COLOR[l.k]}>{l.k === 'welcome' ? term.welcome : l.t}</span>
            </div>
          ))}
          <label className="relative flex items-center whitespace-pre">
            <span className="text-ink">{term.prompt}</span>
            <span className="text-ink">{input}</span>
            <span aria-hidden="true" className="h-[17px] w-[9px] animate-blink bg-glacial" />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  run(input)
                }
              }}
              aria-label={term.inputLabel}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              className="absolute inset-0 w-full border-0 font-[inherit] opacity-0"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-3.5 py-3">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="cursor-pointer rounded-tag border border-line-strong bg-transparent px-2.5 py-1 font-mono text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
