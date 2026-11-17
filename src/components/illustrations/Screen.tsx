import { useLang } from '../../i18n/useLang'
import type { ScreenKind } from './kinds'

/**
 * Telas ILUSTRATIVAS (640×400) para os projetos que ainda não têm print (Axevoke e Dashboard TIflux).
 * São esquemas sem dados reais, marcados "ilustração", e não representam funcionalidades.
 */

const GLACIAL = '#80c7e8'

function IllustrationLabel({ right }: { right: number }) {
  const { t } = useLang()
  return (
    <div className="absolute bottom-2 text-[10px] tracking-[.04em] text-[#8a9099]" style={{ right }}>
      {t.projects.illustration}
    </div>
  )
}

const TITLES: Record<ScreenKind, [string, string]> = {
  axe: ['Admissão', 'Axevoke'],
  tif: ['Painel', 'dados de demonstração'],
}

const AXE_STEPS: [string, boolean][] = [
  ['Dados pessoais', true],
  ['Conta e e-mail', true],
  ['Equipamento', true],
  ['Acessos aos sistemas', false],
  ['Termo LGPD', false],
]
const TIF_BARS = [40, 62, 48, 92, 70, 35, 55]

export function Screen({ kind }: { kind: ScreenKind }) {
  const [title, tag] = TITLES[kind]
  return (
    <div className="relative flex h-[400px] w-[640px] flex-col gap-4 overflow-hidden bg-[#12151b] px-[30px] py-[26px] font-sans text-ink">
      <div className="flex items-center justify-between">
        <b className="text-xl tracking-[-0.01em]">{title}</b>
        <span className="rounded-[5px] border border-[rgba(240,237,231,.18)] px-2 py-0.5 font-mono text-[11px] text-ink-2">
          {tag}
        </span>
      </div>

      {kind === 'axe' && (
        <>
          <div className="flex justify-between text-sm text-ink-2">
            <span>Admissão de colaborador</span>
            <span className="rounded-[5px] border border-line-strong px-2 py-0.5 font-mono text-[11px]">
              dados isolados por empresa
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2.5">
            {AXE_STEPS.map(([step, done]) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-[9px] bg-[#171b21] px-3.5 py-2.5"
                style={{ color: done ? 'var(--text)' : 'var(--text-2)' }}
              >
                <span
                  className="size-3.5 rounded-[3px] border border-ink"
                  style={{ background: done ? GLACIAL : 'transparent' }}
                />
                {step}
              </div>
            ))}
          </div>
        </>
      )}

      {kind === 'tif' && (
        <div className="flex flex-1 gap-[26px]">
          <div className="flex flex-[1.4] flex-col justify-end gap-2">
            <span className="text-xs text-ink-2">chamados por semana</span>
            <div className="flex h-[190px] items-end gap-2 border-b border-[rgba(240,237,231,.3)]">
              {TIF_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[4px]"
                  style={{ height: `${h}%`, background: i === 3 ? GLACIAL : '#3a404b' }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2.5">
            <span className="text-xs text-ink-2">SLA no prazo</span>
            <div className="grid grid-cols-10 gap-[3px]">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="h-5 rounded-sm" style={{ background: i < 7 ? '#a4aab4' : '#262b33' }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <IllustrationLabel right={12} />
    </div>
  )
}
