const VALUES = [
  {
    title: 'Dignidad',
    text: 'Cada mujer merece ser tratada con respeto y reconocida en su valor intrínseco.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0v18M3 12h18" />
      </svg>
    ),
  },
  {
    title: 'Equidad',
    text: 'Trabajamos para nivelar las condiciones y eliminar las barreras sistémicas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    ),
  },
  {
    title: 'Sororidad',
    text: 'Construimos redes de apoyo entre mujeres para crecer juntas.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Transparencia',
    text: 'Rendimos cuentas a nuestra comunidad con información clara y verificable.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-white relative" aria-labelledby="nosotros-title">

      {/* Línea superior degradada */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, #d834d4 0%, #e96ee6 50%, transparent 100%)' }}
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
            a mujeres en situación de vulnerabilidad, brindándoles herramientas,
            redes de apoyo y oportunidades reales de transformación. Con presencia
            en Risaralda y Quindío.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Columna izquierda: texto + valores ── */}
          <div>
            <p
              className="text-soft-grey font-light leading-relaxed mb-12"
              style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}
            >
              Desde nuestra fundación, hemos trabajado con cientos de mujeres en
              programas de formación, orientación psicosocial y emprendimiento,
              creyendo firmemente que el cambio social comienza cuando cada mujer
              reconoce y ejerce su poder.
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
                    <p className="text-[11px] tracking-[2px] uppercase text-magenta font-semibold mb-1.5">
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
                Acompañar a mujeres en situación de vulnerabilidad para que alcancen
                su pleno potencial, eliminando los techos de cristal que limitan su
                desarrollo personal, social y económico.
              </blockquote>
            </div>

            {/* Visión */}
            <div
              className="p-8 lg:p-10"
              style={{ background: 'linear-gradient(135deg, #d834d4 0%, #a020a0 100%)' }}
            >
              <p className="text-[10px] tracking-[3px] text-white/60 uppercase mb-4 font-medium">
                Nuestra visión
              </p>
              <p
                className="text-white font-light leading-relaxed"
                style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
              >
                Ser la organización de referencia en Colombia en el empoderamiento
                femenino, construyendo una sociedad donde ninguna mujer enfrente
                barreras invisibles para alcanzar sus sueños.
              </p>
            </div>

            {/* Dato destacado */}
            <div
              className="flex items-center gap-5 p-6 border border-charcoal/10"
              style={{ background: 'linear-gradient(135deg, #fdf7f2, #fff)' }}
            >
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #d834d4, #a020a0)' }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] tracking-[2px] uppercase text-soft-grey mb-1">Fundada en</p>
                <p className="font-serif text-[22px] text-charcoal font-semibold leading-none">2021</p>
              </div>
              <div className="w-px h-10 bg-charcoal/10 mx-2" aria-hidden="true" />
              <div>
                <p className="text-[11px] tracking-[2px] uppercase text-soft-grey mb-1">Sede principal</p>
                <p className="font-serif text-[18px] text-charcoal font-light leading-none">Dosquebradas, Risaralda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
