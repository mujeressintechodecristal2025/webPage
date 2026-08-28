import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt: string
  onClose: () => void
}

/**
 * Muestra una imagen a tamaño completo en un overlay modal.
 * Se cierra al hacer clic fuera, en la X, o con la tecla Escape.
 */
export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  // Cerrar con Escape y bloquear scroll del body mientras está abierto
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        aria-label="Cerrar imagen"
      >
        <X size={28} />
      </button>

      {/* Imagen a tamaño completo */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
