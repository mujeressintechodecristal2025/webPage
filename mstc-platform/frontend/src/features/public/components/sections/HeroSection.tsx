import Button from '@/shared/components/Button'
import { ASSETS } from '@/shared/config/assets'

const STATS = [
  { num: '100+', label: 'Mujeres apoyadas' },
  { num: '5',    label: 'Años de impacto' },
  { num: '3',    label: 'Programas activos' },
]

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      const navHeight = 72
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="inicio"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{ paddingTop: '72px', background: 'linear-gradient(165deg, #f8fafc 0%, #faf5ff 40%, #f8fafc 100%)' }}
      aria-label="Sección principal"
    >
      {/* Elementos decorativos orgánicos — tendencia 2026 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Blob superior derecho */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #c026d3 0%, transparent 70%)' }}
        />
        {/* Blob inferior izquierdo */}
        <div
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
        />
        {/* Grid sutil de puntos */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24 relative z-10">

        {/* ── Columna izquierda: Textos ── */}
        <div className="max-w-xl animate-fade-in-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-magenta/8 border border-magenta/15 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-magenta animate-pulse" aria-hidden="true" />
            <span className="text-[10px] tracking-[2px] uppercase text-magenta font-medium">
              Fundación sin ánimo de lucro
            </span>
          </div>

          <h1
            className="font-serif font-bold text-charcoal leading-[1.02] mb-7 tracking-tight"
            style={{ fontSize: 'clamp(42px, 5.5vw, 76px)' }}
          >
            Rompiendo<br />
            barreras,<br />
            <span className="relative inline-block">
              <span className="relative z-10">construyendo</span>
              {/* Línea decorativa debajo */}
              <span
                className="absolute bottom-1 left-0 w-full h-3 -z-0 opacity-20 rounded-sm"
                style={{ background: 'linear-gradient(90deg, #c026d3, #f97316)' }}
                aria-hidden="true"
              />
            </span>
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c026d3, #d946ef)' }}>
              futuros
            </span>
          </h1>

          <p
            className="text-soft-grey font-light max-w-md mb-10 leading-[1.8]"
            style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
          >
            Impulsamos el crecimiento integral y el liderazgo de mujeres en
            comunidades vulnerables de Colombia, a través de programas de formación,
            capacitación psicosocial y emprendimiento.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center mb-14">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full shadow-[0_8px_30px_rgba(192,38,211,0.25)]"
              onClick={() => scrollTo('#contacto')}
              aria-label="Ir a sección de donaciones"
            >
              Quiero donar
            </Button>
            <button
              onClick={() => scrollTo('#nosotros')}
              className="border border-charcoal/20 text-charcoal hover:border-magenta hover:text-magenta font-sans text-[11px] tracking-[2px] uppercase px-9 py-[18px] rounded-full transition-all duration-300"
              aria-label="Conocer más sobre la fundación"
            >
              Conocer más
            </button>
          </div>

          {/* Estadísticas */}
          <div className="flex flex-wrap gap-10 pt-8 border-t border-charcoal/8">
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ animationDelay: `${i * 0.15}s` }} className="animate-count">
                <p className="font-serif font-bold leading-none mb-1.5 text-transparent bg-clip-text"
                   style={{ fontSize: 'clamp(30px, 3vw, 42px)', backgroundImage: 'linear-gradient(135deg, #c026d3, #86198f)' }}>
                  {stat.num}
                </p>
                <p className="text-[10px] tracking-[2px] text-soft-grey/70 uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Columna derecha: Composición visual ── */}
        <div className="hidden lg:flex items-center justify-center relative animate-fade-in-right">
          <div className="relative w-full max-w-md">

            {/* Fondo geométrico abstracto */}
            <div className="absolute inset-0 -m-6" aria-hidden="true">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #c026d3, transparent 70%)' }}
              />
              <div
                className="absolute bottom-8 left-4 w-40 h-40 rounded-full opacity-[0.08]"
                style={{ background: 'radial-gradient(circle, #f97316, transparent 70%)' }}
              />
            </div>

            {/* Logo principal — composición limpia */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative">
                {/* Anillo exterior decorativo */}
                <div
                  className="absolute -inset-6 rounded-full opacity-10"
                  style={{ border: '1px solid #c026d3' }}
                  aria-hidden="true"
                />
                {/* Anillo medio */}
                <div
                  className="absolute -inset-12 rounded-full opacity-5"
                  style={{ border: '1px dashed #c026d3' }}
                  aria-hidden="true"
                />

                {/* Contenedor del logo */}
                <div className="w-72 h-72 rounded-full bg-white shadow-[0_20px_60px_rgba(192,38,211,0.08),0_8px_24px_rgba(0,0,0,0.04)] flex items-center justify-center p-8 border border-charcoal/5">
                  <img
                    src={ASSETS.logo}
                    alt="Fundación Mujeres sin Techo de Cristal"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Tarjeta flotante: Programas activos */}
            <div className="absolute -left-6 top-8 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white z-20">
              <span className="text-[9px] text-soft-grey font-semibold tracking-[2px] uppercase block mb-1">
                Activos
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-gold">3</span>
                <span className="text-sm font-semibold text-charcoal">programas</span>
              </div>
            </div>

            {/* Tarjeta flotante: Desde 2021 */}
            <div className="absolute -right-4 bottom-16 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white z-20">
              <span className="text-[9px] text-soft-grey font-semibold tracking-[2px] uppercase block mb-1">
                Desde
              </span>
              <span className="text-3xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c026d3, #86198f)' }}>
                2021
              </span>
            </div>

            {/* Tarjeta flotante: Colombia */}
            <div className="absolute left-12 -bottom-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white z-20">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇨🇴</span>
                <span className="text-[11px] font-semibold text-charcoal tracking-wide">Colombia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#nosotros')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-soft-grey/30 hover:text-magenta transition-colors group"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="text-[9px] tracking-[3px] uppercase font-medium">Explorar</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-float">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  )
}
