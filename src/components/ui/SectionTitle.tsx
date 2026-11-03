export interface TitleParts {
  before?: string
  /** Trecho com marca-texto (fundo `--highlight`) */
  mark: string
  after?: string
}

interface SectionTitleProps {
  /** Linha mono acima do título, ex.: "GET /projetos" */
  request: string
  /** Código de status em destaque, ex.: "200 OK" */
  status: string
  title: TitleParts
  className?: string
}

/** Cabeçalho de seção do design v5: linha `GET /rota 200 OK` e título condensado com marca-texto */
export function SectionTitle({ request, status, title, className = '' }: SectionTitleProps) {
  return (
    <div className={className}>
      <div className="font-mono text-[12.5px] text-ink-2">
        {request} <b className="text-ink">{status}</b>
      </div>
      <h2 className="display m-0 mt-2.5 text-[clamp(46px,7cqw,100px)] leading-[0.9] tracking-[-0.01em]">
        {title.before && `${title.before} `}
        <mark className="bg-highlight px-[0.12em] text-inherit">{title.mark}</mark>
        {title.after && ` ${title.after}`}
      </h2>
    </div>
  )
}
