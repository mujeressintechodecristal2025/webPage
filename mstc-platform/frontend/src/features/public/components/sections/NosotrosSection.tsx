import { useState, useEffect, useRef } from 'react'
import { ASSETS } from '@/shared/config/assets'

const VALUES = [
  {
    title: 'Sororidad',
    text: 'Fomentamos una cultura de apoyo mutuo y empoderamiento colectivo entre mujeres.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Equidad',
    text: 'Trabajamos por la justicia social y la igualdad de oportunidades reales, reconociendo y cerrando brechas históricas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    ),
  },
  {
    title: 'Resiliencia',
    text: 'Transformamos los obstáculos en peldaños de crecimiento, impulsando la capacidad de superar la adversidad.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Integridad',
    text: 'Actuamos con transparencia, ética y coherencia en cada una de nuestras intervenciones y programas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Innovación Social',
    text: 'Buscamos soluciones creativas y disruptivas para enfrentar los desafíos de género en el mundo contemporáneo.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
]

export default function NosotrosSection() {
  const [showLightbox, setShowLightbox] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Escape key handler + focus trap
  useEffect(() => {
    if (!showLightbox) return

    // Focus the close button when lightbox opens
    closeBtnRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLightbox(false)
      }
      // Trap focus inside lightbox (only one focusable element: close btn)
      if (e.key === 'Tab') {
        e.preventDefault()
        closeBtnRef.current?.focus()
      }
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showLightbox])

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-white relative" aria-labelledby="nosotros-title">

      {/* Lightbox — imagen completa representante legal */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setShowLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen completa de Mónica Jhoana Ospina"
        >
          <button
            ref={closeBtnRef}
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Cerrar imagen"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={ASSETS.representante}
            alt="Mónica Jhoana Ospina — Representante Legal"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Línea superior degradada */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, #c026d3 0%, #e879f9 50%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header de sección */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="section-label">Quiénes somos</p>
          <h2
            id="nosotros-title"
            className="font-serif font-light text-charcoal leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
          >
            Mujeres que rompen{' '}
            <em className="italic text-magenta">el cristal</em>
          </h2>
          <p
            className="text-soft-grey font-light leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}
          >
            Somos una fundación colombiana sin ánimo de lucro dedicada a acompañar
            a mujeres de comunidades vulnerables, donde el desarrollo del individuo
            es el principal objetivo para la realización integral de la mujer en
            todas las esferas sociales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Columna izquierda: texto + valores ── */}
          <div>
            <p
              className="text-soft-grey font-light leading-relaxed mb-12"
              style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}
            >
              Nuestro objetivo estratégico es lograr que la mujer adquiera el
              liderazgo transformador y se convierta en una mujer nueva, siendo
              plenamente la protagonista de su propio destino, a través de programas
              educativos, capacitación psicosocial y acompañamiento estratégico.
            </p>

            {/* Valores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="group flex gap-4 p-5 border-l-[3px] border-magenta bg-cream hover:bg-magenta/5 transition-all duration-200 cursor-default"
                >
                  <div className="text-magenta mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[2px] uppercase text-magenta-dark font-semibold mb-1.5">
                      {v.title}
                    </p>
                    <p className="text-[13px] text-soft-grey leading-relaxed font-light">
                      {v.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Columna derecha: misión + visión ── */}
          <div className="flex flex-col gap-5">

            {/* Misión */}
            <div className="bg-charcoal p-10 lg:p-12 relative overflow-hidden">
              {/* Comilla decorativa */}
              <span
                className="absolute -top-4 right-6 font-serif text-[160px] leading-none font-bold pointer-events-none select-none"
                style={{ color: 'rgba(216,52,212,0.12)', lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </span>
              <p className="text-[10px] tracking-[3px] text-magenta-light uppercase mb-5 font-medium">
                Nuestra misión
              </p>
              <blockquote
                className="font-serif font-light italic text-white leading-relaxed relative z-10"
                style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
              >
                Impulsar el crecimiento integral y el liderazgo de las mujeres,
                eliminando las barreras invisibles que limitan su desarrollo
                profesional y personal, a través de programas educativos,
                capacitación psicosocial, acompañamiento estratégico y la incidencia
                social.
              </blockquote>
            </div>

            {/* Visión */}
            <div
              className="p-8 lg:p-10"
              style={{ background: 'linear-gradient(135deg, #c026d3 0%, #86198f 100%)' }}
            >
              <p className="text-[10px] tracking-[3px] text-white/80 uppercase mb-4 font-medium">
                Nuestra visión
              </p>
              <p
                className="text-white font-light leading-relaxed"
                style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
              >
                Para el año 2030, ser la organización referente en la transformación
                de entornos equitativos, logrando que el concepto «techo de cristal»
                sea cosa del pasado. Aspiramos a una sociedad donde el talento y la
                ambición de las mujeres no tengan límites impuestos, consolidando una
                red de liderazgo femenino e impacto social.
              </p>
            </div>

            {/* Dato destacado — Representante Legal */}
            <div
              className="relative p-8 lg:p-10 overflow-hidden border-l-[3px] border-magenta"
              style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fff 100%)' }}
            >
              {/* Decoración de fondo */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #c026d3, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                {/* Foto representante legal — clickeable */}
                <button
                  onClick={() => setShowLightbox(true)}
                  className="group relative flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-magenta/50 rounded-full"
                  aria-label="Ver foto completa de Mónica Jhoana Ospina"
                >
                  <img
                    src={ASSETS.representante}
                    alt="Mónica Jhoana Ospina — Representante Legal"
                    className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover object-top ring-4 ring-magenta/40 shadow-xl group-hover:ring-magenta/70 group-hover:scale-105 transition-all duration-300"
                  />
                  {/* Indicador de zoom */}
                  <span className="absolute bottom-1 right-1 bg-magenta text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </span>
                </button>

                <div className="text-center sm:text-left">
                  <p className="text-[10px] tracking-[3px] uppercase text-magenta font-semibold mb-2">
                    Representante Legal & Fundadora
                  </p>
                  <p className="font-serif text-[24px] sm:text-[28px] text-charcoal font-semibold leading-tight">
                    Mónica Jhoana Ospina
                  </p>
                  <p className="text-[14px] text-soft-grey font-light mt-2 leading-relaxed">
                    Líder social comprometida con la transformación de comunidades vulnerables desde 2021.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
