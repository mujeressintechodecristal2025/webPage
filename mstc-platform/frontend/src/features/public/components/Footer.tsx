import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ASSETS } from '@/shared/config/assets'

const NAV_LINKS = ['Inicio', 'Nosotros', 'Proyectos', 'Impacto', 'Contacto']

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/profile.php?id=61572277466220',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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

            <p className="text-[13px] text-white/60 leading-relaxed font-light max-w-xs mb-3">
              Eliminando los techos de cristal que limitan el desarrollo y la
              dignidad de las mujeres en Colombia desde 2021.
            </p>

            <p className="text-[11px] text-white/55 font-light mb-8">
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
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-magenta/50 hover:bg-magenta/10 transition-all duration-200 rounded-sm"
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
                    className="text-[13px] text-white/65 hover:text-white transition-colors font-light tracking-wide text-left"
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
                  className="text-[13px] text-white/65 hover:text-white transition-colors font-light tracking-wide"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/transparencia"
                  className="text-[13px] text-white/65 hover:text-white transition-colors font-light tracking-wide"
                >
                  Transparencia RTE-DIAN
                </Link>
              </li>
            </ul>

            {/* Badge RTE */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-2 border border-magenta/20 bg-magenta/5">
              <div className="w-1.5 h-1.5 rounded-full bg-magenta/60" aria-hidden="true" />
              <span className="text-[10px] tracking-[1.5px] text-magenta uppercase font-medium">
                Régimen Tributario Especial
              </span>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/55 tracking-wide text-center sm:text-left">
            © {year} Fundación Mujeres sin Techo de Cristal · NIT 901907058-9 · Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-white/50 tracking-wide">
            Hecho con ♥ en Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
