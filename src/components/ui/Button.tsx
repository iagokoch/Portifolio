import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline-accent'
type Size = 'xs' | 'sm' | 'md' | 'cta' | 'lg'

// Hover: o botão afunda 2px e a sombra encolhe 2px. Cada string é literal para o Tailwind enxergar.
const SIZES: Record<Size, string> = {
  xs: 'px-3 py-[9px] text-xs shadow-px-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--shadow)]',
  sm: 'px-3.5 py-2.5 text-xs shadow-px-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--shadow)]',
  md: 'px-[18px] py-[13px] text-sm shadow-px-md hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--shadow)]',
  // md com sombra de 5px (WhatsApp)
  cta: 'px-[18px] py-[13px] text-sm shadow-px hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_var(--shadow)]',
  lg: 'px-[22px] py-[15px] text-[15px] shadow-px hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_var(--shadow)]',
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent border-shadow',
  secondary: 'bg-transparent text-fg border-border-input hover:border-fg',
  'outline-accent': 'bg-transparent text-fg border-border-input hover:border-accent hover:text-accent',
}

const BASE =
  'inline-flex cursor-pointer items-center gap-2.5 rounded-px border font-pixel no-underline transition-[transform,box-shadow,border-color,color] duration-100'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type AnchorProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>

export type ButtonProps = AnchorProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

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
