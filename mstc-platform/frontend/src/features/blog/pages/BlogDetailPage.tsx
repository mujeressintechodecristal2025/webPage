import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import SEO from '@/shared/components/SEO'
import BlogPostContent from '@/features/blog/components/BlogPostContent'
import ImageLightbox from '@/features/blog/components/ImageLightbox'
import { useBlogPost } from '@/features/blog/hooks/useBlogPost'
import type { ProblemDetail } from '@/shared/types'

// Skeleton del artículo durante la carga
function ArticleSkeleton() {
  return (
    <div className="animate-pulse max-w-3xl mx-auto space-y-6 pt-8">
      <div className="aspect-video bg-gray-200 rounded-2xl" />
      <div className="h-10 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  )
}

/**
 * Página de detalle de un post del blog.
 * Ruta: /blog/:slug
 * Solo muestra posts con status PUBLISHED — 404 para borradores.
 */
export default function BlogDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { data: post, isLoading, isError, error } = useBlogPost(slug)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const is404 = isError && (error as ProblemDetail)?.status === 404

  const formattedDate = post?.publishedAt
    ? new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  return (
    <>
      {/* SEO dinámico — solo cuando tenemos el post */}
      {post && (
        <SEO
          title={post.title}
          description={post.excerpt ?? `Lee el artículo completo en el blog de la Fundación MSTC`}
          path={`/blog/${post.slug}`}
        />
      )}
      {!post && !isLoading && (
        <SEO
          title="Post no encontrado"
          description="El artículo que buscas no existe o no está disponible."
          path={`/blog/${slug}`}
          noindex
        />
      )}

      <div className="min-h-screen bg-cream pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Botón volver */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-soft-grey hover:text-magenta transition-colors mb-8 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Volver al blog
          </Link>

          {/* Estado de carga */}
          {isLoading && <ArticleSkeleton />}

          {/* Post no encontrado */}
          {is404 && (
            <div className="text-center py-24">
              <p className="font-serif text-6xl text-gray-200 mb-6">404</p>
              <h1 className="font-serif text-3xl text-charcoal mb-3">Post no encontrado</h1>
              <p className="text-soft-grey mb-8">
                El artículo que buscas no existe o no está publicado.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-magenta text-sm underline underline-offset-2 hover:text-magenta-dark"
              >
                <ArrowLeft size={14} />
                Ver todos los posts
              </Link>
            </div>
          )}

          {/* Error genérico */}
          {isError && !is404 && (
            <div className="text-center py-20">
              <p className="text-soft-grey mb-4">No se pudo cargar el artículo. Intenta de nuevo.</p>
              <Link to="/blog" className="text-magenta text-sm underline underline-offset-2">
                Volver al blog
              </Link>
            </div>
          )}

          {/* Artículo completo */}
          {post && (
            <article>

              {/* Imagen de portada — se ajusta completa al recuadro; clic abre lightbox */}
              {post.imageS3Key && (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="group relative block w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm bg-gray-100 cursor-zoom-in"
                  aria-label="Ampliar imagen"
                >
                  <img
                    src={post.imageS3Key}
                    alt={post.title}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </button>
              )}

              {/* Lightbox */}
              {lightboxOpen && post.imageS3Key && (
                <ImageLightbox
                  src={post.imageS3Key}
                  alt={post.title}
                  onClose={() => setLightboxOpen(false)}
                />
              )}

              {/* Categoría */}
              {post.category && (
                <span className="inline-block bg-magenta/10 text-magenta-dark text-xs font-sans font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}

              {/* Título */}
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-soft-grey pb-6 mb-8 border-b border-gray-200">
                {post.authorName && (
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {post.authorName}
                  </span>
                )}
                {formattedDate && (
                  <time dateTime={post.publishedAt} className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formattedDate}
                  </time>
                )}
                {post.tags && post.tags.length > 0 && (
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <Tag size={14} />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-soft-grey text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="font-serif text-xl text-soft-grey leading-relaxed mb-8 italic">
                  {post.excerpt}
                </p>
              )}

              {/* Contenido HTML */}
              <BlogPostContent html={post.body} />

              {/* Separador y volver */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-soft-grey hover:text-magenta transition-colors group"
                >
                  <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                  Volver al blog
                </Link>
              </div>

            </article>
          )}

        </div>
      </div>
    </>
  )
}
