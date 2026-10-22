import type { ReactNode } from 'react'
import { useLang } from '../../i18n/useLang'

// Mini-telas ilustrativas dos projetos (só dados de demonstração, nada real)

const FRAME = 'aspect-[16/10] overflow-hidden border-b border-border bg-panel-2 p-[18px]'
const MONO = 'font-mono'
const STRIPE_8 = 'bg-[repeating-linear-gradient(45deg,var(--border)_0_2px,transparent_2px_8px)]'
const STRIPE_7 = 'bg-[repeating-linear-gradient(45deg,var(--border)_0_2px,transparent_2px_7px)]'
const STRIPE_6 = 'bg-[repeating-linear-gradient(45deg,var(--border-input)_0_2px,transparent_2px_6px)]'

function Pips({ filled }: { filled: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`size-2 ${i < filled ? 'bg-accent' : 'border border-border-input'}`} />
      ))}
    </div>
  )
}

export function MicroLearnPreview() {
  const { t } = useLang()
  const p = t.projects.items.microlearn

  return (
    <div className={`${FRAME} flex flex-col gap-3`}>
      <div className={`${MONO} flex items-center gap-2 text-[11px]`}>
        <span className="size-4 bg-accent" />
        <span className="text-fg">microlearn</span>
        <span className="ml-auto text-muted">{p.track}</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        <div className="flex flex-col gap-2 border border-accent bg-bg p-2">
          <div className={`flex flex-1 items-center justify-center ${STRIPE_8}`}>
            <span className="flex size-[18px] items-center justify-center bg-accent text-[9px] text-on-accent">▶</span>
          </div>
          <span className={`${MONO} text-[10px] text-fg`}>{p.lesson} 01</span>
          <div className="h-[5px] w-[80%] bg-border-input" />
          <Pips filled={5} />
        </div>
        <div className="flex flex-col gap-2 border border-border bg-bg p-2">
          <div className={`flex-1 ${STRIPE_8}`} />
          <span className={`${MONO} text-[10px] text-fg`}>{p.lesson} 02</span>
          <div className="h-[5px] w-[64%] bg-border-input" />
          <Pips filled={2} />
        </div>
        <div className="flex flex-col gap-2 border border-dashed border-border-input bg-bg p-2">
          <div className="flex flex-1 items-center justify-center font-pixel text-[9px] text-muted">{p.locked}</div>
          <span className={`${MONO} text-[10px] text-muted`}>{p.lesson} 03</span>
          <div className="h-[5px] w-[72%] bg-border" />
          <Pips filled={0} />
        </div>
      </div>
    </div>
  )
}

export function PetFriendPreview() {
  const { t } = useLang()
  const p = t.projects.items.petfriend

  return (
    <div className={`${FRAME} flex items-center justify-center gap-[18px]`}>
      <div className="flex aspect-[9/16] h-full flex-col gap-1.5 rounded-px border-2 border-border-input bg-bg p-2 shadow-px-md">
        <div className="flex justify-between">
          <span className="h-[3px] w-3.5 bg-border-input" />
          <span className="h-[3px] w-2 bg-border-input" />
        </div>
        <span className={`${MONO} text-[9px] text-soft`}>petfriend</span>
        <div className={`flex flex-1 items-center justify-center border border-border ${STRIPE_7} ${MONO} text-[8px] text-muted`}>{p.photo}</div>
        <div className="h-[5px] w-[70%] bg-fg" />
        <div className="h-1 w-[46%] bg-border-input" />
        <div className="flex gap-1">
          <span className="flex h-4 w-5 flex-none items-center justify-center border border-border-input text-[8px] text-muted">✕</span>
          <span className={`${MONO} flex h-4 flex-1 items-center justify-center bg-soft text-[8px] text-[#16151a]`}>{p.connect}</span>
        </div>
      </div>
      <div className="flex w-[42%] flex-col gap-2.5">
        <div className="flex items-center gap-2 border border-border bg-bg p-2">
          <span className={`size-[26px] flex-none ${STRIPE_6}`} />
          <div className="flex flex-1 flex-col gap-1">
            <span className="h-1 w-[80%] bg-fg" />
            <span className="h-1 w-1/2 bg-border-input" />
          </div>
        </div>
        <div className="flex items-center gap-2 border border-soft bg-bg p-2">
          <span className={`size-[26px] flex-none ${STRIPE_6}`} />
          <div className="flex flex-1 flex-col gap-1">
            <span className="h-1 w-[64%] bg-fg" />
            <span className="h-1 w-[40%] bg-border-input" />
          </div>
          <span className={`${MONO} text-[9px] text-soft`}>{p.match}</span>
        </div>
        <div className={`${MONO} self-start border border-border-input px-1.5 py-[3px] text-[9px] text-muted`}>{p.ci}</div>
      </div>
    </div>
  )
}

const Key = ({ children }: { children: ReactNode }) => <span className="text-fg">{children}</span>
const Str = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>
const Num = ({ children }: { children: ReactNode }) => <span className="text-soft">{children}</span>

export function OrdersPreview() {
  const { t } = useLang()

  return (
    <div className={`${FRAME} ${MONO} grid grid-cols-2 gap-2.5 text-[11px] leading-[1.65]`}>
      <div className="flex min-w-0 flex-col border border-border bg-bg">
        <div className="flex items-center gap-2 border-b border-border px-2.5 py-[7px]">
          <span className="bg-soft px-[5px] py-px text-[10px] text-[#16151a]">POST</span>
          <span className="text-fg">/orders</span>
        </div>
        <div className="p-2.5 text-muted">
          <div>{'{'}</div>
          <div className="pl-[2ch]"><Key>"customer"</Key>: <Str>"demo"</Str>,</div>
          <div className="pl-[2ch]"><Key>"items"</Key>: [</div>
          <div className="pl-[4ch]">{'{'} <Key>"sku"</Key>: <Str>"A-01"</Str>,</div>
          <div className="pl-[6ch]"><Key>"qty"</Key>: <Num>2</Num> {'}'}</div>
          <div className="pl-[2ch]">]</div>
          <div>{'}'}</div>
        </div>
      </div>
      <div className="flex min-w-0 flex-col border border-accent bg-bg">
        <div className="flex items-center gap-2 border-b border-border px-2.5 py-[7px]">
          <span className="bg-accent px-[5px] py-px text-[10px] text-on-accent">201</span>
          <span className="text-fg">Created</span>
          <span className="ml-auto text-muted">demo</span>
        </div>
        <div className="p-2.5 text-muted">
          <div>{'{'}</div>
          <div className="pl-[2ch]"><Key>"id"</Key>: <Str>"ord_0001"</Str>,</div>
          <div className="pl-[2ch]"><Key>"status"</Key>: <Str>"queued"</Str>,</div>
          <div className="pl-[2ch]"><Key>"items"</Key>: <Num>1</Num></div>
          <div>{'}'}</div>
          <div className="mt-2 flex items-center gap-1.5 text-fg">
            <span className="size-[7px] animate-blink bg-accent" />
            {t.projects.items.orders.queue}
          </div>
        </div>
      </div>
    </div>
  )
}

const WEEK = [40, 65, 50, 85, 55, 70, 30]
const SLA_FILLED = 7

export function TifluxPreview() {
  const { t } = useLang()
  const p = t.projects.items.tiflux

  return (
    <div className={`${FRAME} ${MONO} grid grid-cols-[1.5fr_1fr] grid-rows-[1fr_auto] gap-2.5 text-[10px] text-muted`}>
      <div className="flex flex-col gap-2 border border-border bg-bg p-2.5">
        <span>{p.weekly}</span>
        <div className="flex flex-1 items-end gap-1.5 border-b border-border-input">
          {WEEK.map((h, i) => (
            <span key={i} className={`flex-1 ${i === 3 ? 'bg-accent' : 'bg-border-input'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between">
          <span>{p.monday}</span>
          <span>{p.sunday}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 border border-border bg-bg p-2.5">
        <span>{p.sla}</span>
        <div className="flex flex-1 items-end gap-[3px]">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`flex-1 ${i < SLA_FILLED ? 'bg-accent' : 'border border-border-input'}`}
              style={{ height: `${20 + i * 8}%` }}
            />
          ))}
        </div>
        <span className="text-fg">{p.onTime}</span>
      </div>
      <div className="col-span-full flex items-center gap-1.5">
        <span className="flex items-center gap-[5px] border border-border px-1.5 py-[3px]">
          <span className="size-1.5 bg-accent" />
          {p.open}
        </span>
        <span className="flex items-center gap-[5px] border border-border px-1.5 py-[3px]">
          <span className="size-1.5 bg-soft" />
          {p.inProgress}
        </span>
        <span className="ml-auto border border-dashed border-border-input px-1.5 py-[3px]">{p.demoData}</span>
      </div>
    </div>
  )
}
