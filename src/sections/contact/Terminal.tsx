import { useEffect, useRef, useState } from 'react'
import { config } from '../../config'
import { useLang } from '../../i18n/LangContext'
import { out, type OutLine } from '../../i18n/types'

// `welcome` não guarda texto: é traduzido na renderização, então acompanha a troca de idioma
type Line = { k: 'cmd' | 'out' | 'ok' | 'err' | 'welcome'; t: string }
const WELCOME: Line = { k: 'welcome', t: '' }

const CHIPS = ['help', 'about', 'projects', 'skills', 'contact', 'github', 'clear', 'sudo hire iago']

// O terminal é sempre escuro, em qualquer tema: cores fixas, fora dos tokens
const COLOR: Record<Line['k'], string> = {
  cmd: 'text-[#f1f1f5]',
  out: 'text-[#a3a6b5]',
  ok: 'text-[#b9a6ff]',
  err: 'text-[#ff6b5f]',
  welcome: 'text-[#b9a6ff]',
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
    <div
      data-load="c1"
      className="flex min-w-0 flex-[1.3_1_500px] flex-col rounded-px border border-[#3a3e4d] bg-[#08090c] font-mono text-[#f1f1f5] shadow-px"
    >
      <div className="flex items-center gap-1.5 border-b border-[#2c2f3b] bg-[#14151b] px-3.5 py-2.5 text-xs text-[#a3a6b5]">
        <span className="size-[9px] bg-[#3a3e4d]" />
        <span className="size-[9px] bg-[#3a3e4d]" />
        <span className="size-[9px] bg-[#ff9f1c]" />
        <span className="ml-2.5">{term.title}</span>
        <span className="ml-auto">{term.size}</span>
      </div>

      <div className="relative min-h-80 flex-1" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        <div ref={scrollRef} role="log" aria-live="polite" className="absolute inset-0 overflow-auto p-[18px] text-sm leading-[1.7]">
          {lines.map((l, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">
              {l.k === 'cmd' && <span className="text-[#ff9f1c]">{term.prompt}</span>}
              <span className={COLOR[l.k]}>{l.k === 'welcome' ? term.welcome : l.t}</span>
            </div>
          ))}
          <label className="relative flex items-center whitespace-pre">
            <span className="text-[#ff9f1c]">{term.prompt}</span>
            <span>{input}</span>
            <span aria-hidden="true" className="h-[17px] w-[9px] animate-blink bg-[#ff9f1c]" />
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
        {/* scanlines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.028)_0_1px,transparent_1px_3px)]"
        />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-[#2c2f3b] px-3.5 py-3">
        {CHIPS.map((c) => {
          const hire = c === 'sudo hire iago'
          return (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className={`cursor-pointer rounded-px border bg-transparent px-2.5 py-[5px] font-mono text-[12.5px] border-[#3a3e4d] hover:border-[#ff9f1c] hover:text-[#ff9f1c] ${
                hire ? 'border-dashed text-[#ff9f1c]' : 'text-[#f1f1f5]'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}
