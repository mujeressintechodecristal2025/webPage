import { cn } from '@/shared/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass'
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
  const base = 'inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn'

  const variants = {
    primary: 'bg-gradient-to-r from-magenta to-magenta-dark text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(216,52,212,0.3)] active:translate-y-0 active:shadow-none',
    outline: 'border border-white/20 text-white/80 hover:border-magenta-light/50 hover:text-magenta-light hover:bg-white/5 bg-transparent backdrop-blur-sm',
    ghost:   'text-magenta hover:bg-magenta/8 border border-magenta/20 hover:border-magenta/40',
    glass:   'glass text-white hover:bg-white/10 hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'text-[9px] px-5 py-2.5 rounded-sm',
    md: 'text-[10px] px-9 py-4 rounded-sm',
    lg: 'text-[11px] px-12 py-5 rounded-sm',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect on hover — tendencia 2026 */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
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
