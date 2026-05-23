import { cn } from '@/shared/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-magenta text-white hover:bg-magenta-dark hover:-translate-y-0.5 hover:shadow-lg',
    outline: 'border border-white/30 text-white/80 hover:border-magenta-light hover:text-magenta-light bg-transparent',
    ghost:   'text-magenta hover:bg-magenta/5 border border-magenta/25',
  }

  const sizes = {
    sm: 'text-[9px] px-5 py-2.5',
    md: 'text-[10px] px-9 py-4',
    lg: 'text-[11px] px-12 py-5',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Procesando...
        </span>
      ) : children}
    </button>
  )
}
