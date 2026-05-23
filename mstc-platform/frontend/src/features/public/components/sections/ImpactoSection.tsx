import { useEffect, useRef, useState } from 'react'

const STATS = [
  {
    value: 500,
    suffix: '+',
    label: 'Mujeres apoyadas',
    description: 'han transformado su vida con nuestros programas',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: 12,
    suffix: '',
    label: 'Programas activos',
    description: 'en formación, protección y emprendimiento',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    value: 45,
    suffix: '',
    label: 'Aliados estratégicos',
    description: 'empresas e instituciones que creen en la causa',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: 4,
    suffix: '',
    label: 'Años de impacto',
    description: 'construyendo un Colombia más equitativa',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

/** Hook para animar contadores cuando el elemento entra en viewport */
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])

  return count
}

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1600, active)

  return (
    <div className="group flex flex-col items-center text-center p-8 lg:p-10 border border-white/10 hover:border-magenta/40 hover:bg-white/5 transition-all duration-300 cursor-default">
      {/* Ícono */}
      <div className="text-magenta/60 group-hover:text-magenta-light mb-5 transition-colors duration-300">
        {stat.icon}
      </div>

      {/* Número */}
      <p
        className="font-serif font-semibold leading-none mb-2 text-gradient-magenta-gold"
        style={{ fontSize: 'clamp(44px, 5vw, 64px)' }}
        aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
      >
        {active ? count : 0}{stat.suffix}
      </p>

      {/* Label */}
      <p className="text-[11px] tracking-[2.5px] text-white/60 uppercase mb-2 font-medium">
        {stat.label}
      </p>

      {/* Descripción */}
      <p className="text-[12px] text-white/30 font-light leading-relaxed max-w-[160px]">
        {stat.description}
      </p>
    </div>
  )
}

export default function ImpactoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="impacto"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-charcoal relative overflow-hidden"
      aria-labelledby="impacto-title"
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(216,52,212,0.10) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(233,110,230,0.06) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="section-label justify-center">Nuestro impacto</p>
          <h2
            id="impacto-title"
            className="font-serif font-light text-white leading-[1.1]"
            style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
          >
            Números que{' '}
            <em className="italic text-magenta-light">hablan por sí solos</em>
          </h2>
        </div>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </div>

        {/* Nota al pie */}
        <p className="text-center text-[11px] text-white/25 mt-8 tracking-wide">
          Datos acumulados desde 2021 · Actualizado 2025
        </p>
      </div>
    </section>
  )
}
