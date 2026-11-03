import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

// `subtle` = botão do header (prata)
type Variant = 'primary' | 'secondary' | 'subtle'
type Size = 'xs' | 'md'

// Cada string é literal para o Tailwind enxergar
const SIZES: Record<Size, string> = {
  xs: 'px-3.5 py-2 font-mono text-[13px] font-normal',
  md: 'px-5 py-[11px] text-[15px]',
}

const VARIANTS: Record<Variant, string> = {
  primary: 'border-transparent bg-ink text-bg hover:bg-white',
  secondary: 'border-[rgba(240,237,231,.35)] bg-transparent text-ink hover:border-ink',
  subtle: 'border-transparent bg-ink-2 text-bg hover:bg-ink',
}

const BASE =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-btn border font-sans font-semibold no-underline transition-[transform,background-color,border-color,color] duration-[250ms] ease-out hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type OmitCommon<T> = Omit<T, keyof CommonProps | 'href'>

/** Link externo ou âncora da mesma página */
type AnchorProps = CommonProps & { href: string; to?: undefined } & OmitCommon<AnchorHTMLAttributes<HTMLAnchorElement>>
/** Navegação interna (react-router) */
type RouteProps = CommonProps & { to: string; href?: undefined } & OmitCommon<AnchorHTMLAttributes<HTMLAnchorElement>>
type NativeButtonProps = CommonProps & { href?: undefined; to?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonProps
  >

export type ButtonProps = AnchorProps | RouteProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (props.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<RouteProps, keyof CommonProps>
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }
  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof CommonProps>
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }
  const buttonRest = rest as Omit<NativeButtonProps, keyof CommonProps>
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
