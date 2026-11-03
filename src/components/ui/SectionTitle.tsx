export interface TitleParts {
  before?: string
  /** Trecho com marca-texto (fundo `--highlight`) */
  mark: string
  after?: string
}

/** Linha mono acima do título: `GET /rota` e o código de status em destaque (`200 OK`) */
export function SectionRequest({ request, status }: { request: string; status: string }) {
  return (
    <div className="font-mono text-[12.5px] text-ink-2">
      {request} <b className="text-ink">{status}</b>
    </div>
  )
}

/** Título condensado em caixa alta, com um trecho em marca-texto */
export function SectionHeading({ title, className = '' }: { title: TitleParts; className?: string }) {
  return (
    <h2 className={`display m-0 text-[clamp(46px,7cqw,100px)] leading-[0.9] tracking-[-0.01em] ${className}`}>
      {title.before && `${title.before} `}
      <mark className="bg-highlight px-[0.12em] text-inherit">{title.mark}</mark>
      {title.after && ` ${title.after}`}
    </h2>
  )
}

interface SectionTitleProps {
  request: string
  status: string
  title: TitleParts
  className?: string
}

/** Cabeçalho de seção do design v5: linha `GET /rota 200 OK` e título condensado com marca-texto */
export function SectionTitle({ request, status, title, className = '' }: SectionTitleProps) {
  return (
    <div className={className}>
      <SectionRequest request={request} status={status} />
      <SectionHeading title={title} className="mt-2.5" />
    </div>
  )
}
