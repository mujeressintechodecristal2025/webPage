import { useState } from 'react'
import { cn } from '@/shared/utils/cn'
import { ASSETS } from '@/shared/config/assets'

const TESTIMONIOS = [
  {
    id: 1,
    image: ASSETS.galleryTestimonios[0],
    alt: 'Testimonio beneficiaria 1',
  },
  {
    id: 2,
    image: ASSETS.galleryTestimonios[1],
    alt: 'Testimonio beneficiaria 2',
  },
  {
    id: 3,
    image: ASSETS.galleryTestimonios[2],
    alt: 'Testimonio beneficiaria 3',
  },
]

export default function TestimoniosSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden" aria-labelledby="testimonios-title">

      {/* Decoración ambiental */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
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

        {/* Imagen principal con marco decorativo */}
        <div className="max-w-4xl mx-auto">

          <div className="relative">

            {/* Corner accents — viven fuera del overflow hidden */}
            <div className="absolute -top-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-0 w-full h-[2.5px]"
                style={{ background: 'linear-gradient(90deg, #c026d3, transparent)' }} />
              <div className="absolute top-0 left-0 h-full w-[2.5px]"
                style={{ background: 'linear-gradient(180deg, #c026d3, transparent)' }} />
            </div>

            <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none" aria-hidden="true">
              <div className="absolute bottom-0 right-0 w-full h-[2.5px]"
                style={{ background: 'linear-gradient(270deg, #c026d3, transparent)' }} />
              <div className="absolute bottom-0 right-0 h-full w-[2.5px]"
                style={{ background: 'linear-gradient(0deg, #c026d3, transparent)' }} />
            </div>

            {/* Imagen */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Accent line top */}
              <div className="absolute top-0 inset-x-0 h-[2.5px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, #c026d3 30%, #e879f9 50%, #c026d3 70%, transparent)' }}
                aria-hidden="true"
              />

              <img
                src={TESTIMONIOS[active].image}
                alt={TESTIMONIOS[active].alt}
                className="w-full h-auto object-contain transition-all duration-400 ease-out"
              />

              {/* Accent line bottom */}
              <div className="absolute bottom-0 inset-x-0 h-[2.5px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, #c026d3 30%, #e879f9 50%, #c026d3 70%, transparent)' }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 sm:gap-5 mt-10">
            {TESTIMONIOS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={cn(
                  'relative rounded-xl overflow-hidden transition-all duration-300 ease-out',
                  i === active
                    ? 'ring-2 ring-magenta ring-offset-2 ring-offset-white shadow-lg scale-105'
                    : 'opacity-50 hover:opacity-90 hover:scale-105 ring-1 ring-charcoal/10'
                )}
                aria-label={`Ver testimonio ${i + 1}`}
              >
                <img
                  src={t.image}
                  alt={t.alt}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
