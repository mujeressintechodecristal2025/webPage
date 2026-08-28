import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, User, Tag, Eye } from 'lucide-react'
import BlogPostContent from '@/features/blog/components/BlogPostContent'
import { getAdminBlogPost } from '@/features/admin/api/adminBlogApi'

/**
 * Previsualización de un post (incluye borradores) en el panel admin.
 * Ruta: /admin/blog/:id/preview
 * Usa el endpoint admin que devuelve cualquier estado.
 */
export default function AdminBlogPreviewPage() {
  const { id = '' } = useParams<{ id: string }>()

  const { data: post, isLoading } = useQuery({
    queryKey: ['admin', 'blog', 'preview', id],
    queryFn: () => getAdminBlogPost(id),
    enabled: !!id,
  })

  const formattedDate = post?.publishedAt || post?.createdAt
    ? new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
        .format(new Date(post?.publishedAt || post?.createdAt || ''))
    : null

  return (
    <div>
      {/* Banner de previsualización */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/admin/blog"
          className="inline-flex items-center gap-1.5 text-sm text-soft-grey hover:text-charcoal transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver a la lista
        </Link>
        {post && (
          <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 text-amber-700">
            <Eye size={13} />
            Vista previa {post.status === 'DRAFT' ? '(borrador)' : '(publicado)'}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="animate-pulse max-w-3xl mx-auto space-y-6">
          <div className="aspect-video bg-gray-200 rounded-2xl" />
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      )}

      {post && (
        <article className="max-w-3xl mx-auto">
          {post.imageS3Key && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-sm bg-gray-100">
              <img src={post.imageS3Key} alt={post.title} className="w-full h-full object-contain" />
            </div>
          )}

          {post.category && (
            <span className="inline-block bg-magenta/10 text-magenta-dark text-xs font-sans font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}

          <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-soft-grey pb-6 mb-8 border-b border-gray-200">
            {post.authorName && (
              <span className="flex items-center gap-1.5"><User size={14} />{post.authorName}</span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1.5"><Calendar size={14} />{formattedDate}</span>
            )}
            {post.tags && post.tags.length > 0 && (
              <span className="flex items-center gap-1.5 flex-wrap">
                <Tag size={14} />
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-soft-grey text-xs px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </span>
            )}
          </div>

          {post.excerpt && (
            <p className="font-serif text-xl text-soft-grey leading-relaxed mb-8 italic">{post.excerpt}</p>
          )}

          <BlogPostContent html={post.body} />
        </article>
      )}
    </div>
  )
}
