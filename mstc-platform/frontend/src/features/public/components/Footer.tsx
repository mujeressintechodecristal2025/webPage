import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ASSETS } from '@/shared/config/assets'

const NAV_LINKS = ['Inicio', 'Nosotros', 'Proyectos', 'Impacto', 'Contacto']

const SOCIAL = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/profile.php?id=61572277466220',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(`#${id.toLowerCase()}`)
        if (el) {
          const navHeight = 72
          const top = el.getBoundingClientRect().top + window.scrollY - navHeight
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 300)
    } else {
      const el = document.querySelector(`#${id.toLowerCase()}`)
      if (el) {
        const navHeight = 72
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-charcoal relative" role="contentinfo">

      {/* Línea superior */}
      <div
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, #d834d4 0%, #e96ee6 50%, #d834d4 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">

          {/* Columna marca */}
          <div>
            {/* Logo + nombre */}
            <div className="flex items-center gap-3 mb-5">
              <img
                src={ASSETS.logo}
                alt="Fundación MSTC"
                className="h-12 w-12 object-cover rounded-full ring-2 ring-white/10"
              />
              <div>
                <p className="font-serif text-white text-[15px] font-light leading-tight">
                  Fundación Mujeres
                </p>
                <p className="font-serif text-magenta-light text-[13px] font-semibold tracking-wide">
                  sin Techo de Cristal
                </p>
              </div>
            </div>

            <p className="text-[13px] text-white/40 leading-relaxed font-light max-w-xs mb-3">
              Eliminando los techos de cristal que limitan el desarrollo y la
              dignidad de las mujeres en Colombia desde 2021.
            </p>

            <p className="text-[11px] text-white/30 font-light mb-8">
              Representante legal: <span className="text-white/50">Mónica Jhoana Ospina</span>
            </p>

            {/* Redes sociales */}
            <div className="flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`Visitar ${s.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-magenta/50 hover:bg-magenta/10 transition-all duration-200 rounded-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna navegación */}
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-magenta-light mb-5 font-medium">
              Navegación
            </p>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="text-[13px] text-white/45 hover:text-white transition-colors font-light tracking-wide text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna legal */}
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-magenta-light mb-5 font-medium">
              Legal
            </p>
            <ul className="space-y-3" role="list">
              <li>
                <Link
                  to="/politica-de-privacidad"
                  className="text-[13px] text-white/45 hover:text-white transition-colors font-light tracking-wide"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/transparencia"
                  className="text-[13px] text-white/45 hover:text-white transition-colors font-light tracking-wide"
                >
                  Transparencia RTE-DIAN
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-white/45 hover:text-white transition-colors font-light tracking-wide"
                >
                  Términos de uso
                </a>
              </li>
            </ul>

            {/* Badge RTE */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-2 border border-magenta/20 bg-magenta/5">
              <div className="w-1.5 h-1.5 rounded-full bg-magenta/60" aria-hidden="true" />
              <span className="text-[10px] tracking-[1.5px] text-magenta/60 uppercase font-light">
                Régimen Tributario Especial
              </span>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/25 tracking-wide text-center sm:text-left">
            © {year} Fundación Mujeres sin Techo de Cristal · NIT 901907058-9 · Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-white/20 tracking-wide">
            Hecho con ♥ en Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
