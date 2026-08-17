import { Link } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import type { BlogPostSummary } from '@/shared/types'

interface BlogCardProps {
  post: BlogPostSummary
  className?: string
}

/**
 * Tarjeta de post del blog para la lista pública.
 * Imagen 16:9, categoría badge, título, excerpt, fecha y autor.
 */
export default function BlogCard({ post, className }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  return (
    <article
      className={cn(
        'group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100',
        className,
      )}
      role="article"
      aria-label={post.title}
    >
      {/* Imagen de portada */}
      <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden" tabIndex={-1} aria-hidden="true">
        {post.imageS3Key ? (
          <img
            src={post.imageS3Key}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-magenta-dark via-purple-deep to-charcoal" />
        )}
        {/* Badge categoría sobre la imagen */}
        {post.category && (
          <span className="absolute top-3 left-3 bg-magenta/90 backdrop-blur-sm text-white text-[10px] font-sans font-medium tracking-widest uppercase px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </Link>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Título */}
        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-serif text-xl text-charcoal leading-snug line-clamp-2 group-hover:text-magenta transition-colors duration-200">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-soft-grey text-sm leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-sans text-magenta-dark bg-magenta/8 border border-magenta/15 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta: autor y fecha */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-soft-grey font-sans">
            {post.authorName || 'Fundación MSTC'}
          </span>
          {formattedDate && (
            <time
              dateTime={post.publishedAt}
              className="text-xs text-soft-grey font-sans"
            >
              {formattedDate}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}
