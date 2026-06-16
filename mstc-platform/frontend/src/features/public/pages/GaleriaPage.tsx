import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ASSETS } from '@/shared/config/assets'
import SEO from '@/shared/components/SEO'

type TabKey = 'todos' | 'talleres' | 'capacitaciones' | 'comunidad'

interface GalleryImage {
  src: string
  alt: string
  category: Exclude<TabKey, 'todos'>
}

const TABS: { key: TabKey; label: string; description: string }[] = [
  { key: 'todos', label: 'Todos', description: 'Todas nuestras actividades' },
  { key: 'talleres', label: 'Talleres de Modistería', description: 'Programa Mujer Emprende — Diseño, patronaje y confección' },
  { key: 'capacitaciones', label: 'Capacitaciones', description: 'Formación psicosocial y estrategias de emprendimiento' },
  { key: 'comunidad', label: 'Comunidad', description: 'Nuestras beneficiarias y el equipo' },
]

function buildGallery(): GalleryImage[] {
  const images: GalleryImage[] = []

  ASSETS.galleryTalleres.forEach((src, i) => {
    images.push({ src, alt: `Taller de modistería ${i + 1}`, category: 'talleres' })
  })

  ASSETS.galleryCapacitaciones.forEach((src, i) => {
    images.push({ src, alt: `Capacitación psicosocial ${i + 1}`, category: 'capacitaciones' })
  })

  ASSETS.galleryGrupales.forEach((src, i) => {
    images.push({ src, alt: `Comunidad y beneficiarias ${i + 1}`, category: 'comunidad' })
  })

  return images
}

const ALL_IMAGES = buildGallery()

export default function GaleriaPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = (searchParams.get('tab') as TabKey) || 'todos'
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab)
  const [lightbox, setLightbox] = useState<number | null>(null)

  // Scroll al inicio al entrar a la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const tab = searchParams.get('tab') as TabKey
    if (tab && TABS.some((t) => t.key === tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key)
    setSearchParams(key === 'todos' ? {} : { tab: key })
  }

  const filtered = activeTab === 'todos'
    ? ALL_IMAGES
    : ALL_IMAGES.filter((img) => img.category === activeTab)

  const activeTabData = TABS.find((t) => t.key === activeTab)

  // Lightbox navigation
  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : filtered.length - 1))
  const nextImage = () => setLightbox((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : 0))

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, filtered.length])

  return (
    <div className="pt-[72px] min-h-screen bg-cream">
      <SEO
        title="Galería"
        description="Fotos reales de los talleres de modistería, capacitaciones psicosociales y actividades de la Fundación Mujeres sin Techo de Cristal en Dosquebradas, Risaralda."
        path="/galeria"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-magenta hover:text-magenta-dark transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <h1
            className="font-serif text-charcoal font-light leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            Nuestra{' '}
            <em className="italic text-magenta">Galería</em>
          </h1>
          <p className="text-soft-grey font-light text-[15px] leading-relaxed max-w-2xl">
            Imágenes reales de nuestros programas, talleres y el impacto en la vida
            de las mujeres que acompañamos en el Eje Cafetero.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-5 py-2.5 text-[11px] tracking-[1.5px] uppercase font-medium transition-all duration-200 rounded-sm ${
                  activeTab === tab.key
                    ? 'bg-charcoal text-white shadow-lg'
                    : 'bg-white text-soft-grey border border-charcoal/10 hover:border-magenta/30 hover:text-magenta'
                }`}
                aria-pressed={activeTab === tab.key}
              >
                {tab.label}
                <span className="ml-2 text-[9px] opacity-60">
                  ({tab.key === 'todos' ? ALL_IMAGES.length : ALL_IMAGES.filter((i) => i.category === tab.key).length})
                </span>
              </button>
            ))}
          </div>
          {activeTabData && (
            <p className="text-[13px] text-soft-grey font-light">
              {activeTabData.description}
            </p>
          )}
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {filtered.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-charcoal/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta"
              aria-label={`Ver ${image.alt} en tamaño completo`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-soft-grey text-[15px]">No hay imágenes en esta categoría.</p>
          </div>
        )}

        {/* Contador */}
        <p className="text-center text-[11px] text-soft-grey/60 mt-8 tracking-wide">
          {filtered.length} {filtered.length === 1 ? 'imagen' : 'imágenes'}
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imagen"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            aria-label="Cerrar visor"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
            aria-label="Imagen anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
            aria-label="Imagen siguiente"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
          </div>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[2px] text-white/40 uppercase">
            {lightbox + 1} / {filtered.length}
          </p>
        </div>
      )}
    </div>
  )
}
