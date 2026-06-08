import { useState } from 'react'
import { cn } from '@/shared/utils/cn'

const TESTIMONIOS = [
  {
    id: 1,
    quote: 'Gracias a Mujer Emprende aprendí a confeccionar mis propios diseños. Hoy tengo mi taller y genero ingresos para mi familia. La fundación me devolvió la confianza en mí misma.',
    name: 'Participante Programa Mujer Emprende',
    program: 'Mujer Emprende',
    initials: 'ME',
  },
  {
    id: 2,
    quote: 'Las capacitaciones psicosociales me ayudaron a sanar heridas que cargaba hace años. Ahora soy una mujer más fuerte y puedo ayudar a otras.',
    name: 'Beneficiaria Capacitaciones Psicosociales',
    program: 'Capacitaciones Psicosociales',
    initials: 'CP',
  },
  {
    id: 3,
    quote: 'Nunca imaginé que podría tener mi propio negocio. El programa de emprendimiento me dio las herramientas y el acompañamiento para lograrlo.',
    name: 'Egresada Estrategias para Emprendedores',
    program: 'Estrategias para Emprendedores',
    initials: 'EE',
  },
]

export default function TestimoniosSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden" aria-labelledby="testimonios-title">

      {/* Decoración sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c026d3, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label justify-center">Testimonios</p>
          <h2
            id="testimonios-title"
            className="font-serif font-light text-charcoal leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            Voces que{' '}
            <em className="italic text-magenta">inspiran</em>
          </h2>
          <p className="text-soft-grey font-light text-[15px] leading-relaxed">
            Las historias de nuestras beneficiarias son la mejor prueba de que
            el cambio es posible cuando hay oportunidades reales.
          </p>
        </div>

        {/* Testimonio activo */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-cream rounded-2xl p-10 lg:p-14 border border-charcoal/5">

            {/* Comilla decorativa */}
            <span
              className="absolute top-6 left-8 font-serif text-[120px] leading-none text-magenta/10 pointer-events-none select-none"
              aria-hidden="true"
            >
              "
            </span>

            {/* Quote */}
            <blockquote className="relative z-10 mb-8">
              <p
                className="font-serif italic text-charcoal leading-relaxed"
                style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}
              >
                {TESTIMONIOS[active].quote}
              </p>
            </blockquote>

            {/* Autor */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-magenta to-magenta-dark flex items-center justify-center text-white font-bold text-sm">
                {TESTIMONIOS[active].initials}
              </div>
              <div>
                <p className="text-charcoal font-medium text-[14px]">
                  {TESTIMONIOS[active].name}
                </p>
                <p className="text-soft-grey text-[12px]">
                  {TESTIMONIOS[active].program}
                </p>
              </div>
            </div>
          </div>

          {/* Dots navegación */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'h-3 rounded-full transition-all duration-300',
                  i === active
                    ? 'bg-magenta w-10'
                    : 'bg-charcoal/15 hover:bg-charcoal/30 w-3'
                )}
                aria-label={`Ver testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
