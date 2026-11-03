import type { ReactNode } from 'react'
import { useLang } from '../../i18n/useLang'
import type { DentKind, ProjKind, ScreenKind } from './kinds'

/**
 * Telas ILUSTRATIVAS (640×400) mostradas dentro dos tablets. São esquemas sem dados reais,
 * marcados "ilustração": existem até haver prints de cada projeto. Não representam funcionalidades.
 */

const GLACIAL = '#80c7e8'
const BLOCK = '#2f3640'

const Bar = ({ w, h = 7, c = '#3a404b' }: { w: string; h?: number; c?: string }) => (
  <i className="block rounded-[3px]" style={{ width: w, height: h, background: c }} />
)

function IllustrationLabel({ right }: { right: number }) {
  const { t } = useLang()
  return (
    <div className="absolute bottom-2 text-[10px] tracking-[.04em] text-[#8a9099]" style={{ right }}>
      {t.projects.illustration}
    </div>
  )
}

/* ---------- DentAgenda ---------- */

const DENT_TITLES: Record<DentKind, string> = {
  agenda: 'Agenda',
  pacientes: 'Pacientes',
  inicio: 'Início',
  disponibilidade: 'Disponibilidade',
}

const DAYS = ['seg', 'ter', 'qua', 'qui', 'sex']
// blocos da agenda por dia: [topo %, altura %, destacado]
const AGENDA_COLS: [number, number, boolean?][][] = [
  [[6, 20], [40, 26, true]],
  [[18, 24], [60, 18]],
  [[2, 18], [30, 22], [64, 20, true]],
  [[12, 28], [54, 24]],
  [[24, 20], [58, 26]],
]
const ROW_WIDTHS = [70, 55, 82, 48, 64, 76]

function DentScreen({ kind }: { kind: DentKind }) {
  return (
    <div className="relative flex h-[400px] w-[640px] overflow-hidden bg-[#12151b] font-sans text-ink">
      <div className="flex w-[150px] flex-none flex-col gap-1.5 border-r border-line bg-bg px-3 py-[18px]">
        <div className="px-2 pb-3.5 text-[15px] font-bold">DentAgenda</div>
        {(['inicio', 'pacientes', 'agenda', 'disponibilidade'] as DentKind[]).map((m) => {
          const on = m === kind
          return (
            <div
              key={m}
              className="rounded-md border-l-2 px-2.5 py-[9px] text-[13px]"
              style={{
                background: on ? '#232832' : 'transparent',
                color: on ? 'var(--text)' : 'var(--text-2)',
                borderColor: on ? GLACIAL : 'transparent',
              }}
            >
              {DENT_TITLES[m]}
            </div>
          )
        })}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3.5 px-[22px] py-5">
        <div className="flex items-center justify-between">
          <b className="text-xl tracking-[-0.01em]">{DENT_TITLES[kind]}</b>
          <span className="h-[22px] w-[70px] rounded-md bg-[#232832]" />
        </div>

        {kind === 'agenda' && (
          <>
            <div className="grid grid-cols-[30px_repeat(5,1fr)] gap-1.5 text-[10px] text-ink-2">
              <span />
              {DAYS.map((d) => (
                <span key={d} className="text-center">
                  {d}
                </span>
              ))}
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[30px_repeat(5,1fr)] gap-1.5">
              <div className="flex flex-col justify-between py-0.5 text-[10px] text-ink-2">
                <span>08h</span>
                <span>10h</span>
                <span>14h</span>
                <span>16h</span>
              </div>
              {AGENDA_COLS.map((col, i) => (
                <div key={i} className="relative border-l border-[rgba(240,237,231,.08)]">
                  {col.map(([top, height, on], j) => (
                    <div
                      key={j}
                      className="absolute right-[3px] left-[3px] rounded-[5px]"
                      style={{ top: `${top}%`, height: `${height}%`, background: on ? GLACIAL : BLOCK }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {kind === 'pacientes' && (
          <>
            <div className="h-[30px] rounded-[7px] border border-line bg-surface" />
            <div className="flex flex-1 flex-col gap-2">
              {ROW_WIDTHS.map((w, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[7px] bg-[#171b21] px-2.5 py-2">
                  <span className="size-[26px] rounded-full bg-[#2a303a]" />
                  <span className="flex flex-1 flex-col gap-[5px]">
                    <Bar w={`${w}%`} />
                    <Bar w="40%" h={6} c="#262b33" />
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {kind === 'inicio' && (
          <>
            <div className="grid grid-cols-3 gap-2.5">
              {['60%', '45%', '72%'].map((w) => (
                <div key={w} className="flex flex-col gap-2 rounded-lg bg-[#171b21] p-3">
                  <Bar w="50%" h={6} />
                  <i className="block h-4 rounded bg-[#2a303a]" style={{ width: w }} />
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {ROW_WIDTHS.map((w, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[7px] bg-[#171b21] p-2.5">
                  <span className="h-2.5 w-11 rounded-[3px]" style={{ background: i % 3 === 0 ? GLACIAL : '#2a303a' }} />
                  <Bar w={`${w}%`} />
                </div>
              ))}
            </div>
          </>
        )}

        {kind === 'disponibilidade' && (
          <div className="flex flex-1 flex-col gap-2.5">
            {DAYS.map((d) => (
              <div key={d} className="flex items-center gap-3 text-[11px] text-ink-2">
                <span className="w-7">{d}</span>
                <span className="relative h-[22px] flex-1 rounded-[5px] bg-[#171b21]">
                  <i className="absolute top-1 bottom-1 left-[8%] w-[34%] rounded bg-[#2f3640]" />
                  <i className="absolute top-1 bottom-1 left-[52%] w-[38%] rounded bg-[#2f3640]" />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <IllustrationLabel right={10} />
    </div>
  )
}

/* ---------- Demais projetos ---------- */

const PROJ_TITLES: Record<ProjKind, [string, string]> = {
  mono: ['Empréstimos', 'Monitoolring'],
  mail: ['Fluxo', 'email-to-ticket'],
  axe: ['Admissão', 'Axevoke'],
  pet: ['Cuidadores', 'PetFriend Connect'],
  tif: ['Painel', 'dados de demonstração'],
}

const AXE_STEPS: [string, boolean][] = [
  ['Dados pessoais', true],
  ['Conta e e-mail', true],
  ['Equipamento', true],
  ['Acessos aos sistemas', false],
  ['Termo LGPD', false],
]
const PET_ROWS: [string, string][] = [
  ['#a4aab4', '72%'],
  ['#6b717c', '58%'],
  [GLACIAL, '80%'],
]
const TIF_BARS = [40, 62, 48, 92, 70, 35, 55]

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[10px] bg-surface px-4 py-3.5 ${className}`}>{children}</div>
)
const Arrow = () => <span className="text-center text-ink-2">↓</span>

function ProjScreen({ kind }: { kind: ProjKind }) {
  const [title, tag] = PROJ_TITLES[kind]
  return (
    <div className="relative flex h-[400px] w-[640px] flex-col gap-4 overflow-hidden bg-[#12151b] px-[30px] py-[26px] font-sans text-ink">
      <div className="flex items-center justify-between">
        <b className="text-xl tracking-[-0.01em]">{title}</b>
        <span className="rounded-[5px] border border-[rgba(240,237,231,.18)] px-2 py-0.5 font-mono text-[11px] text-ink-2">
          {tag}
        </span>
      </div>

      {kind === 'mono' && (
        <>
          <Card className="flex items-center justify-between">
            <b className="text-[17px]">Ferramenta emprestada</b>
            <span className="rounded-[5px] border border-[rgba(240,237,231,.25)] px-2 py-0.5 text-xs text-ink-2">
              emprestada
            </span>
          </Card>
          <div className="flex flex-col gap-2">
            <Bar w="70%" h={8} c={BLOCK} />
            <Bar w="48%" h={8} c="#262b33" />
          </div>
          <div className="mt-auto rounded-[10px] border border-dashed border-glacial bg-card px-4 py-3.5 font-mono text-[13px]">
            <div className="text-glacial">POST /api/loans → 409 Conflict</div>
            <div className="mt-1 text-ink-2">membro com empréstimo em atraso</div>
          </div>
        </>
      )}

      {kind === 'mail' && (
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <Card>
            <div className="font-mono text-[11px] text-ink-2">caixa monitorada</div>
            <b className="text-base">Fechamento de Vaga</b>
          </Card>
          <Arrow />
          <Card className="font-mono text-[13px]">
            <div className="text-[11px] text-ink-2">leitura e extração</div>
            {'{ cargo, unidade, data }'}
          </Card>
          <Arrow />
          <div className="rounded-[10px] bg-ink px-4 py-3.5 text-bg">
            <div className="font-mono text-[11px]">Tiflux</div>
            <b className="text-base">chamado aberto</b>
          </div>
        </div>
      )}

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

      {kind === 'pet' && (
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="h-[34px] rounded-lg border border-line bg-surface" />
          {PET_ROWS.map(([color, w]) => (
            <div key={color} className="flex items-center gap-3.5 rounded-[10px] bg-[#171b21] px-3.5 py-3">
              <span className="size-9 rounded-full" style={{ background: color }} />
              <span className="flex flex-1 flex-col gap-1.5">
                <Bar w={w} h={8} />
                <Bar w="36%" h={6} c="#262b33" />
              </span>
              <span className="rounded-md border border-[rgba(240,237,231,.3)] px-2.5 py-1 text-xs">reservar</span>
            </div>
          ))}
        </div>
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

export function Screen({ kind }: { kind: ScreenKind }) {
  return kind === 'agenda' || kind === 'pacientes' || kind === 'inicio' || kind === 'disponibilidade' ? (
    <DentScreen kind={kind} />
  ) : (
    <ProjScreen kind={kind} />
  )
}
