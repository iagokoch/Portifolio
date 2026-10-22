import { useState } from 'react'
import { Critters } from '../../components/anim/Critters'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useLang } from '../../i18n/useLang'
import { Cartridge } from './Cartridge'

// Os atributos data-crit marcam as linhas que os bichinhos "digitam" na animação do hero
export function Hero({ active }: { active: boolean }) {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const [flown, setFlown] = useState(false)
  const revealed = reduced || flown
  const h = t.hero

  return (
    <section id="top" className="overflow-x-clip border-b border-border">
      <Container className="flex flex-wrap items-center gap-14 py-[clamp(56px,7.8cqw,112px)]">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col items-start gap-[26px]">
          <div data-crit="0">
            <Eyebrow>{h.eyebrow}</Eyebrow>
          </div>
          <h1 className="m-0 flex flex-col font-pixel text-[clamp(60px,7.4cqw,108px)] leading-[0.88] font-normal tracking-[-0.02em]">
            <span data-crit="1">{h.first}</span>
            <span data-crit="2" className="text-accent">
              {h.last}
            </span>
          </h1>
          <div data-crit="3">
            <p className="m-0 max-w-[30ch] text-[clamp(18px,1.55cqw,22px)] leading-[1.4] font-medium text-pretty">{h.role}</p>
          </div>
          <div data-crit="4">
            <p className="m-0 max-w-[44ch] text-[17px] text-muted text-pretty">{h.focus}</p>
          </div>
          <div data-crit="5" className="pb-1.5">
            <Button href="#projetos" size="lg" className="gap-3">
              {h.cta} <span aria-hidden="true">↓</span>
            </Button>
          </div>
        </div>

        {/* a coluna da direita entra depois que os bichinhos terminam de montar o texto */}
        <div
          className={`flex min-w-0 flex-[1_1_380px] justify-end transition-[opacity,transform] duration-[350ms] ease-[steps(5)] ${
            revealed ? 'opacity-100' : 'translate-y-2.5 opacity-0'
          }`}
        >
          <Cartridge />
        </div>
      </Container>

      {/* faixa de chão onde os bichinhos andam */}
      <Container className="-mt-6 pb-10">
        <Critters active={active} onFlown={() => setFlown(true)} />
      </Container>
    </section>
  )
}
