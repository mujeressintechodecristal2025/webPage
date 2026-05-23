// Íconos SVG en lugar de emojis — más profesional y consistente
const IconFormacion = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const IconProteccion = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const IconEmprendimiento = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const PROJECTS = [
  {
    id: 1,
    phase: 'Programa activo',
    name: 'Tejiendo Futuros',
    description: 'Formación en habilidades técnicas y blandas para mujeres en reincorporación laboral. Incluye mentoría personalizada y conexión con empleadores aliados.',
    tags: ['Formación', 'Empleo', 'Mentoría'],
    Icon: IconFormacion,
    accentColor: '#c4006b',
  },
  {
    id: 2,
    phase: 'Programa activo',
    name: 'Raíces Fuertes',
    description: 'Apoyo psicosocial y acompañamiento jurídico para mujeres víctimas de violencia intrafamiliar. Red de casas de acogida y orientación legal gratuita.',
    tags: ['Psicosocial', 'Jurídico', 'Protección'],
    Icon: IconProteccion,
    accentColor: '#8b0049',
  },
  {
    id: 3,
    phase: 'Programa activo',
    name: 'Emprendedoras sin Límites',
    description: 'Incubadora de emprendimientos liderados por mujeres. Formación en finanzas, marketing digital y acceso a microcréditos con tasas preferenciales.',
    tags: ['Emprendimiento', 'Finanzas', 'Microcrédito'],
    Icon: IconEmprendimiento,
    accentColor: '#d4a843',
  },
]

export default function ProyectosSection() {
  return (
    <section id="proyectos" className="py-24 lg:py-32 bg-cream" aria-labelledby="proyectos-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-16 lg:mb-20">
          <div>
            <p className="section-label">Nuestros programas</p>
            <h2
              id="proyectos-title"
              className="font-serif font-light text-charcoal leading-[1.1]"
              style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
            >
              Proyectos que{' '}
              <em className="italic text-magenta">transforman vidas</em>
            </h2>
          </div>
          <p
            className="text-soft-grey font-light leading-relaxed max-w-sm"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            Cada programa ataca una barrera específica con metodologías probadas
            y acompañamiento integral.
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="bg-white overflow-hidden group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Header de tarjeta */}
              <div className="bg-charcoal p-8 relative overflow-hidden flex-shrink-0">
                {/* Barra de acento inferior — aparece en hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                  style={{ background: project.accentColor }}
                  aria-hidden="true"
                />
                {/* Ícono */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 text-magenta-light border border-magenta/30 group-hover:border-magenta/60 transition-colors"
                >
                  <project.Icon />
                </div>
                <p className="text-[10px] tracking-[2.5px] text-magenta-light uppercase mb-2 font-light">
                  {project.phase}
                </p>
                <h3 className="font-serif text-[22px] text-white font-normal leading-tight">
                  {project.name}
                </h3>
              </div>

              {/* Cuerpo de tarjeta */}
              <div className="p-7 flex flex-col flex-1">
                <p className="text-[13px] text-soft-grey leading-relaxed font-light mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[1px] uppercase px-2.5 py-1 border border-magenta/20 text-magenta/80 font-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Banner CTA — reemplaza el proyecto "Plataforma Digital" */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center p-8 lg:p-10"
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)' }}
        >
          <div>
            <p className="text-[10px] tracking-[2.5px] text-magenta-light uppercase mb-3 font-light">
              ¿Quieres hacer parte del cambio?
            </p>
            <h3 className="font-serif text-[26px] lg:text-[32px] text-white font-light leading-tight">
              Tu apoyo transforma vidas reales
            </h3>
            <p className="text-white/50 text-[14px] font-light mt-2 max-w-lg">
              Cada donación financia directamente los programas de formación,
              protección y emprendimiento de nuestras beneficiarias.
            </p>
          </div>
          <button
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 bg-magenta text-white px-8 py-4 text-[11px] tracking-[2px] uppercase font-medium hover:bg-magenta-dark active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            Quiero donar
          </button>
        </div>
      </div>
    </section>
  )
}
