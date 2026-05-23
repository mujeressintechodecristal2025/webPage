import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { ASSETS } from '@/shared/config/assets'

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Impacto',   href: '#impacto' },
  { label: 'Contacto',  href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú al redimensionar a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    // Pequeño delay para que el menú cierre antes del scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/98 backdrop-blur-md shadow-[0_1px_0_rgba(196,0,107,0.12)]'
          : 'bg-cream/95 backdrop-blur-sm',
      )}
      style={{ height: '72px' }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Inicio">
          <img
            src={ASSETS.logo}
            alt="Fundación Mujeres sin Techo de Cristal"
            className="h-10 w-10 object-cover rounded-full ring-2 ring-magenta/20"
          />
          <span className="hidden sm:block font-serif text-[15px] text-charcoal font-light leading-tight">
            Fundación<br />
            <strong className="font-semibold text-magenta text-[13px] tracking-wide">MSTC</strong>
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-[11px] tracking-[2px] uppercase text-charcoal/70 font-light hover:text-magenta transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-px bg-magenta transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <button
          onClick={() => handleNavClick('#contacto')}
          className="hidden md:inline-flex items-center gap-2 bg-magenta text-white px-5 py-2.5 text-[10px] tracking-[2px] uppercase font-medium hover:bg-magenta-dark active:scale-95 transition-all duration-200"
          aria-label="Ir a sección de donaciones"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
          Donar
        </button>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 text-charcoal hover:text-magenta transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú mobile — slide down */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
        style={{ background: 'rgba(253,247,242,0.99)', backdropFilter: 'blur(12px)' }}
      >
        <div className="px-6 py-5 border-t border-magenta/10">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 px-2 text-[12px] tracking-[2px] uppercase text-charcoal/70 font-light hover:text-magenta hover:bg-magenta/5 transition-all rounded"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mt-3">
              <button
                onClick={() => handleNavClick('#contacto')}
                className="w-full bg-magenta text-white py-3.5 text-[11px] tracking-[2px] uppercase font-medium hover:bg-magenta-dark transition-colors"
              >
                Quiero donar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
