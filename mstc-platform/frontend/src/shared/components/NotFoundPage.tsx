import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <Helmet>
        <title>Página no encontrada | Fundación Mujeres sin Techo de Cristal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center">
        <p className="text-xs tracking-widest text-magenta uppercase mb-4">Error 404</p>
        <h1 className="font-serif text-6xl font-light text-charcoal mb-6">
          Página no encontrada
        </h1>
        <p className="text-soft-grey mb-10 max-w-md mx-auto leading-relaxed">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-block bg-magenta text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-magenta-dark transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
