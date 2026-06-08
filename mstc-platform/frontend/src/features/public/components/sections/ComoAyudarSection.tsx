const FORMAS_AYUDA = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Dona',
    description: 'Tu aporte financia directamente los programas de formación y acompañamiento.',
    cta: 'Donar ahora',
    href: '#contacto',
    accent: '#c026d3',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Sé voluntario/a',
    description: 'Comparte tu tiempo y talento. Necesitamos mentoras, facilitadoras y apoyo logístico.',
    cta: 'Quiero ayudar',
    href: '#contacto',
    accent: '#86198f',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    title: 'Difunde',
    description: 'Comparte nuestra misión en redes sociales y ayúdanos a llegar a más mujeres.',
    cta: 'Compartir',
    href: 'https://web.facebook.com/profile.php?id=61572277466220',
    external: true,
    accent: '#f97316',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Alianza empresarial',
    description: 'Vincula tu empresa a nuestra causa. Ofrecemos alianzas de responsabilidad social.',
    cta: 'Contactar',
    href: '#contacto',
    accent: '#0f172a',
  },
]

export default function ComoAyudarSection() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        const navHeight = 72
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="py-24 lg:py-32 bg-cream" aria-labelledby="como-ayudar-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label justify-center">Súmate al cambio</p>
          <h2
            id="como-ayudar-title"
            className="font-serif font-light text-charcoal leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            ¿Cómo puedes{' '}
            <em className="italic text-magenta">ayudar?</em>
          </h2>
          <p className="text-soft-grey font-light text-[15px] leading-relaxed">
            Hay muchas formas de ser parte de esta transformación.
            Elige la que más resuene contigo.
          </p>
        </div>

        {/* Grid de opciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FORMAS_AYUDA.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl p-7 border border-charcoal/5 hover:border-magenta/20 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(192,38,211,0.06)] transition-all duration-300 flex flex-col"
            >
              {/* Ícono */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ background: `${item.accent}10`, color: item.accent }}
              >
                {item.icon}
              </div>

              {/* Contenido */}
              <h3 className="font-serif text-[20px] text-charcoal font-medium mb-2">
                {item.title}
              </h3>
              <p className="text-soft-grey text-[13px] leading-relaxed font-light mb-6 flex-1">
                {item.description}
              </p>

              {/* CTA */}
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[1.5px] uppercase font-semibold text-magenta-dark hover:text-magenta transition-colors flex items-center gap-1.5"
                >
                  {item.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ) : (
                <button
                  onClick={() => scrollTo(item.href)}
                  className="text-[11px] tracking-[1.5px] uppercase font-semibold text-magenta-dark hover:text-magenta transition-colors flex items-center gap-1.5 text-left"
                >
                  {item.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Indicador de transparencia */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-10 border border-charcoal/5 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex items-center gap-4">
            <div className="relative w-24 h-24">
              {/* Círculo de progreso */}
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#c026d3" strokeWidth="8"
                  strokeDasharray={`${85 * 2.64} ${100 * 2.64}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-bold text-charcoal text-xl">
                85%
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-[22px] text-charcoal font-medium mb-2">
              Transparencia financiera
            </h3>
            <p className="text-soft-grey text-[14px] leading-relaxed font-light">
              El <strong className="text-charcoal font-semibold">85% de cada donación</strong> se destina
              directamente a los programas de formación, acompañamiento psicosocial y emprendimiento
              de nuestras beneficiarias. El 15% restante cubre gastos operativos esenciales para
              mantener la fundación en funcionamiento.
            </p>
          </div>
          <a
            href="/transparencia"
            className="flex-shrink-0 text-[11px] tracking-[1.5px] uppercase font-semibold text-magenta-dark border border-magenta-dark/30 px-5 py-3 rounded-full hover:bg-magenta-dark hover:text-white transition-all duration-200"
          >
            Ver informes
          </a>
        </div>
      </div>
    </section>
  )
}
