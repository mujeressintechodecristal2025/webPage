import { useState, useEffect } from 'react'
import { cn } from '@/shared/utils/cn'

export default function StickyDonateButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contacto')
    if (el) {
      const navHeight = 72
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToContact}
      className={cn(
        'fixed bottom-24 right-6 z-40 bg-magenta text-white px-5 py-3.5 rounded-full shadow-[0_8px_30px_rgba(192,38,211,0.35)] flex items-center gap-2.5 text-[11px] tracking-[1.5px] uppercase font-semibold hover:bg-magenta-dark hover:scale-105 active:scale-95 transition-all duration-300',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-16 opacity-0 pointer-events-none'
      )}
      aria-label="Donar ahora"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      Donar
    </button>
  )
}
