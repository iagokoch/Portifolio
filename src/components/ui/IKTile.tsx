interface IKTileProps {
  /** Lado do quadrado em px */
  size: number
  /** Tamanho da fonte Silkscreen em px */
  fontSize: number
  /** Fundo --panel + sombra de pixel (navbar e boot); o do footer é só contorno */
  raised?: boolean
  /** Sombra maior para o tile do boot */
  large?: boolean
  href?: string
  className?: string
}

/** Logo "IK": quadrado com contorno âmbar */
export function IKTile({ size, fontSize, raised = false, large = false, href, className = '' }: IKTileProps) {
  const classes = `flex items-center justify-center rounded-px border border-accent font-pixel text-accent no-underline ${
    raised ? `bg-panel ${large ? 'shadow-px' : 'shadow-px-sm'}` : ''
  } ${className}`
  const style = { width: size, height: size, fontSize }

  return href ? (
    <a href={href} aria-label="Iago Koch" className={classes} style={style}>
      IK
    </a>
  ) : (
    <span className={classes} style={style}>
      IK
    </span>
  )
}
