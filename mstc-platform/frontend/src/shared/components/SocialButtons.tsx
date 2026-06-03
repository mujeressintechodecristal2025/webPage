import { cn } from '@/shared/utils/cn'
import { SOCIAL_LINKS } from '@/shared/config/social'

interface SocialButtonsProps {
  /** 'light' = sobre fondo oscuro (blanco/transparente), 'dark' = sobre fondo claro (magenta) */
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export default function SocialButtons({
  variant = 'dark',
  size = 'md',
  className,
}: SocialButtonsProps) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  const baseClass = cn(
    dim,
    'flex items-center justify-center rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta',
  )

  const variantClass =
    variant === 'light'
      ? 'border border-white/15 text-white/50 hover:text-white hover:border-magenta/50 hover:bg-magenta/10'
      : 'border border-magenta/25 text-magenta hover:bg-magenta hover:text-white hover:border-magenta'

  return (
    <div className={cn('flex gap-2.5', className)} role="list" aria-label="Redes sociales">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visitar ${s.label}`}
          role="listitem"
          className={cn(baseClass, variantClass)}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
