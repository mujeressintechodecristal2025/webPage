import Button from '@/shared/components/Button'
import { ASSETS } from '@/shared/config/assets'

const STATS = [
  { num: '100+', label: 'Mujeres apoyadas' },
  { num: '5',    label: 'Años de impacto' },
  { num: '3',    label: 'Programas activos' },
]

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="min-h-screen bg-hero relative overflow-hidden flex items-center"
      style={{ paddingTop: '72px' }}
      aria-label="Sección principal"
    >
      {/* Gradientes de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 85%, rgba(216,52,212,0.15) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, rgba(221,103,65,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(216,52,212,0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* Líneas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute"
          style={{
            top: '-50%', right: '8%',
            width: '1px', height: '200%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(216,52,212,0.20) 40%, rgba(233,110,230,0.12) 60%, transparent 100%)',
            transform: 'rotate(12deg)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-50%', right: '18%',
            width: '1px', height: '200%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(216,52,212,0.06) 50%, transparent 100%)',
            transform: 'rotate(12deg)',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24">

        {/* ── Columna izquierda ── */}
        <div className="relative z-10 animate-fade-in-up">

          {/* Badge institucional */}
          <div className="inline-flex items-center gap-2.5 border border-magenta/30 bg-magenta/5 px-4 py-2 mb-8 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-magenta-light animate-pulse" aria-hidden="true" />
            <span className="text-[10px] tracking-[2.5px] uppercase text-magenta-light font-light">
              Fundación sin ánimo de lucro · Colombia
            </span>
          </div>

          {/* Título principal */}
          <h1
            className="font-serif font-light text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(44px, 5vw, 76px)' }}
          >
            Rompiendo{' '}
            <em className="italic text-magenta-light not-italic">barreras,</em>
            <br />
            <strong className="font-bold text-gradient-magenta-gold">
              construyendo futuros
            </strong>
          </h1>

          {/* Descripción */}
          <p
            className="text-white/60 font-light max-w-lg mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
          >
            Acompañamos a mujeres de comunidades vulnerables, donde el desarrollo
            del individuo es el principal objetivo para la realización integral de
            la mujer en todas las esferas sociales. Nuestro objetivo estratégico es
            lograr que la mujer adquiera el liderazgo transformador y se convierta
            en protagonista de su propio destino.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center mb-14">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo('#contacto')}
              aria-label="Ir a sección de donaciones"
            >
              Quiero donar
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('#nosotros')}
              aria-label="Conocer más sobre la fundación"
            >
              Conocer más
            </Button>
          </div>

          {/* Estadísticas */}
          <div
            className="flex flex-wrap gap-8 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ animationDelay: `${i * 0.15}s` }} className="animate-count">
                <p className="font-serif font-semibold text-magenta-light leading-none mb-1"
                   style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  {stat.num}
                </p>
                <p className="text-[10px] tracking-[2px] text-white/40 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Columna derecha — Visual ── */}
        <div className="hidden lg:flex items-center justify-center relative z-10 animate-fade-in-right">
          <div className="relative w-full max-w-md">

            {/* Marco decorativo exterior */}
            <div
              className="absolute -top-6 -right-6 w-full h-full border border-magenta/20 rounded-sm"
              aria-hidden="true"
            />
            {/* Marco decorativo interior */}
            <div
              className="absolute -top-3 -right-3 w-full h-full border border-gold/10 rounded-sm"
              aria-hidden="true"
            />

            {/* Imagen principal */}
            <div className="relative overflow-hidden rounded-sm bg-charcoal/50">
              <img
                src={ASSETS.logo}
                alt="Fundación Mujeres sin Techo de Cristal"
                className="w-full h-auto block"
                style={{
                  imageRendering: 'auto',
                }}
              />
              {/* Overlay sutil */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(26,26,46,0.4) 0%, transparent 50%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating card — impacto */}
            <div
              className="absolute -bottom-6 -left-8 px-5 py-4 min-w-[160px] rounded-sm"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <p className="text-[9px] tracking-[2px] text-white/40 uppercase mb-1">
                Desde
              </p>
              <p className="font-serif text-[20px] text-white font-semibold leading-none">
                2021
              </p>
              <p className="text-[10px] text-magenta-light mt-1">Risaralda y Quindío</p>
            </div>

            {/* Floating card — programas */}
            <div
              className="absolute -top-6 -left-6 px-4 py-3 rounded-sm"
              style={{
                background: 'rgba(196,0,107,0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(196,0,107,0.25)',
              }}
            >
              <p className="text-[9px] tracking-[2px] text-white/40 uppercase mb-1">
                Activos
              </p>
              <p className="font-serif text-[18px] text-white font-semibold leading-none">
                3 programas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#nosotros')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="text-[9px] tracking-[3px] uppercase">Explorar</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent group-hover:from-white/60 transition-all" />
      </button>
    </section>
  )
}
