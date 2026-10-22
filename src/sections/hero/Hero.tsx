import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { useLang } from '../../i18n/LangContext'
import { Cartridge } from './Cartridge'

// Os atributos data-crit marcam as linhas que os bichinhos "digitam" na animação do hero
export function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section id="top" className="border-b border-border">
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

        <div className="flex min-w-0 flex-[1_1_380px] justify-end">
          <Cartridge />
        </div>
      </Container>

      {/* faixa de chão onde os bichinhos andam (a animação entra numa etapa seguinte) */}
      <Container className="-mt-6 pb-10">
        <div className="relative h-11">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 bg-[repeating-linear-gradient(90deg,var(--border-input)_0_48px,transparent_48px_54px)]"
          />
        </div>
      </Container>
    </section>
  )
}
