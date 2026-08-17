import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SEO from '@/shared/components/SEO'
import BlogCard from '@/features/blog/components/BlogCard'
import { useBlogPosts } from '@/features/blog/hooks/useBlogPosts'

// Skeleton de tarjeta mientras carga
function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-video bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}

/**
 * Página pública del blog — lista de posts publicados.
 * Ruta: /blog
 */
export default function BlogListPage() {
  const [page, setPage]           = useState(0)
  const [category, setCategory]   = useState<string | undefined>(undefined)

  const { data, isLoading, isError, refetch } = useBlogPosts(page, category)

  // Extraer categorías únicas de los posts actuales
  const categories = data
    ? Array.from(new Set(data.content.map((p) => p.category).filter(Boolean) as string[]))
    : []

  return (
    <>
      <SEO
        title="Blog"
        description="Noticias, historias de impacto y novedades de la Fundación Mujeres Sin Techo de Cristal"
        path="/blog"
      />

      <div className="min-h-screen bg-cream pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado */}
          <div className="text-center mb-12">
            <p className="text-magenta font-sans text-xs tracking-[0.25em] uppercase mb-3">
              Fundación MSTC
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
              Blog
            </h1>
            <p className="text-soft-grey max-w-xl mx-auto">
              Noticias, historias de impacto y novedades de nuestros proyectos.
            </p>
          </div>

          {/* Filtros de categoría */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              <button
                onClick={() => { setCategory(undefined); setPage(0) }}
                className={filterBtnClass(!category)}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(0) }}
                  className={filterBtnClass(category === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Estado de carga */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Estado de error */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-soft-grey mb-4">No se pudo cargar el blog. Intenta de nuevo.</p>
              <button
                onClick={() => refetch()}
                className="text-magenta text-sm underline underline-offset-2"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Estado vacío */}
          {!isLoading && !isError && data?.content.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">✍️</div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">
                Próximamente publicaremos contenido
              </h2>
              <p className="text-soft-grey text-sm">
                Estamos preparando historias e información para ti.
              </p>
            </div>
          )}

          {/* Grid de posts */}
          {!isLoading && !isError && data && data.content.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.content.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Paginación */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-soft-grey hover:border-magenta hover:text-magenta transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </button>

                  <span className="text-sm text-soft-grey">
                    Página {page + 1} de {data.totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                    disabled={page >= data.totalPages - 1}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-soft-grey hover:border-magenta hover:text-magenta transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  )
}

const filterBtnClass = (active: boolean) =>
  `px-4 py-1.5 rounded-full text-sm font-sans border transition-colors ${
    active
      ? 'bg-magenta text-white border-magenta'
      : 'bg-white text-soft-grey border-gray-200 hover:border-magenta hover:text-magenta'
  }`
