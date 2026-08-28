import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, Search, ExternalLink } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { useAdminBlogPosts } from '@/features/admin/hooks/useAdminBlogPosts'
import { useDeleteBlogPost, useUpdateBlogPost } from '@/features/admin/hooks/useAdminBlogMutations'
import type { BlogPostAdmin, BlogPostFormData } from '@/shared/types'

// ── Modal de confirmación de eliminación ──────────────────────────────────────

interface DeleteModalProps {
  post: BlogPostAdmin
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

function DeleteModal({ post, onConfirm, onCancel, isLoading }: DeleteModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 id="delete-modal-title" className="font-serif text-xl text-charcoal mb-2">
          ¿Eliminar post?
        </h2>
        <p className="text-soft-grey text-sm mb-1">
          Estás a punto de eliminar:
        </p>
        <p className="font-medium text-charcoal text-sm mb-4 truncate">
          "{post.title}"
        </p>
        <p className="text-red-600 text-sm mb-6">
          Esta acción es permanente y no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-soft-grey hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 size={13} />
                Eliminar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

/**
 * Lista de posts del blog en el panel admin.
 * Ruta: /admin/blog
 */
export default function AdminBlogListPage() {
  const [page, setPage]               = useState(0)
  const [postToDelete, setPostToDelete] = useState<BlogPostAdmin | null>(null)
  const [toast, setToast]             = useState<string | null>(null)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL')

  const { data, isLoading } = useAdminBlogPosts(page)
  const deleteMutation      = useDeleteBlogPost()

  // Filtrar los posts de la página actual por búsqueda y estado
  const filteredPosts = (data?.content ?? []).filter((post) => {
    const matchesSearch =
      !search.trim() ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase()) ||
      (post.category ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = async () => {
    if (!postToDelete) return
    try {
      await deleteMutation.mutateAsync(postToDelete.id)
      setPostToDelete(null)
      showToast('Post eliminado correctamente')
    } catch {
      showToast('Error al eliminar el post')
    }
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal text-white text-sm px-4 py-3 rounded-lg shadow-lg animate-fade-in-up">
          {toast}
        </div>
      )}

      {/* Modal de eliminación */}
      {postToDelete && (
        <DeleteModal
          post={postToDelete}
          onConfirm={handleDelete}
          onCancel={() => setPostToDelete(null)}
          isLoading={deleteMutation.isPending}
        />
      )}

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Gestión del Blog</h1>
          <p className="text-soft-grey text-sm mt-0.5">Crea y administra los posts del blog.</p>
        </div>
        <Link
          to="/admin/blog/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-magenta to-magenta-dark text-white text-sm font-sans font-medium hover:shadow-md transition-shadow"
        >
          <Plus size={16} />
          Nuevo post
        </Link>
      </div>

      {/* Búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-grey" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, slug o categoría..."
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm text-charcoal outline-none focus:border-magenta focus:ring-1 focus:ring-magenta/20"
          />
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-4 py-2.5 text-sm font-sans transition-colors',
                statusFilter === s
                  ? 'bg-magenta text-white'
                  : 'bg-white text-soft-grey hover:bg-gray-50',
              )}
            >
              {s === 'ALL' ? 'Todos' : s === 'PUBLISHED' ? 'Publicados' : 'Borradores'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {isLoading ? (
          // Skeleton de tabla
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded flex-1" />
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-8 bg-gray-200 rounded w-32" />
              </div>
            ))}
          </div>
        ) : data?.content.length === 0 ? (
          <div className="text-center py-16 text-soft-grey">
            <p className="text-4xl mb-3">✍️</p>
            <p className="font-medium">No hay posts todavía.</p>
            <p className="text-sm mt-1">
              <Link to="/admin/blog/nuevo" className="text-magenta underline underline-offset-2">
                Crea el primer post
              </Link>
            </p>
          </div>
        ) : (
          <>
            {/* Header de tabla */}
            <div className="hidden md:grid grid-cols-[1fr_120px_120px_140px_180px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-soft-grey uppercase tracking-wider">
              <span>Título</span>
              <span>Categoría</span>
              <span>Estado</span>
              <span>Creado</span>
              <span className="text-right">Acciones</span>
            </div>

            {/* Filas */}
            <div className="divide-y divide-gray-100">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-soft-grey text-sm">
                  No hay posts que coincidan con la búsqueda.
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostRow
                    key={post.id}
                    post={post}
                    onDelete={() => setPostToDelete(post)}
                    onToast={showToast}
                  />
                ))
              )}
            </div>

            {/* Paginación */}
            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-200 text-sm text-soft-grey hover:border-magenta hover:text-magenta transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  Anterior
                </button>
                <span className="text-sm text-soft-grey">
                  {page + 1} / {data.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                  disabled={page >= data.totalPages - 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-200 text-sm text-soft-grey hover:border-magenta hover:text-magenta transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Siguiente
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Fila de la tabla ──────────────────────────────────────────────────────────

interface PostRowProps {
  post: BlogPostAdmin
  onDelete: () => void
  onToast: (msg: string) => void
}

function PostRow({ post, onDelete, onToast }: PostRowProps) {
  const updateMutation = useUpdateBlogPost(post.id)

  const toggleStatus = async () => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    try {
      await updateMutation.mutateAsync({
        title:      post.title,
        slug:       post.slug,
        excerpt:    post.excerpt    ?? '',
        body:       post.body       ?? '',
        imageS3Key: post.imageS3Key ?? '',
        category:   post.category   ?? '',
        tags:       post.tags       ?? [],
        status:     newStatus,
        authorName: post.authorName ?? '',
      } as BlogPostFormData)
      onToast(newStatus === 'PUBLISHED' ? 'Post publicado ✓' : 'Post despublicado ✓')
    } catch {
      onToast('Error al cambiar el estado')
    }
  }

  const createdDate = post.createdAt
    ? new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
        .format(new Date(post.createdAt))
    : '—'

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_140px_180px] gap-2 md:gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
      {/* Título */}
      <div className="min-w-0">
        <p className="font-medium text-charcoal text-sm truncate">{post.title}</p>
        <p className="text-soft-grey text-xs mt-0.5 truncate">/blog/{post.slug}</p>
      </div>

      {/* Categoría */}
      <span className="text-sm text-soft-grey truncate hidden md:block">
        {post.category || '—'}
      </span>

      {/* Estado */}
      <span
        className={cn(
          'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full w-fit',
          post.status === 'PUBLISHED'
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-gray-100 text-gray-600',
        )}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full', post.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-gray-400')} />
        {post.status === 'PUBLISHED' ? 'Publicado' : 'Borrador'}
      </span>

      {/* Fecha */}
      <span className="text-xs text-soft-grey hidden md:block">{createdDate}</span>

      {/* Acciones */}
      <div className="flex items-center gap-1 md:justify-end flex-wrap">
        {/* Publicar / Despublicar */}
        <button
          onClick={toggleStatus}
          disabled={updateMutation.isPending}
          title={post.status === 'PUBLISHED' ? 'Despublicar' : 'Publicar'}
          className={cn(
            'flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
            post.status === 'PUBLISHED'
              ? 'text-amber-600 hover:bg-amber-50'
              : 'text-emerald-600 hover:bg-emerald-50',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
        >
          {post.status === 'PUBLISHED' ? <EyeOff size={13} /> : <Eye size={13} />}
          <span className="hidden sm:inline">
            {post.status === 'PUBLISHED' ? 'Despublicar' : 'Publicar'}
          </span>
        </button>

        {/* Previsualizar */}
        <Link
          to={`/admin/blog/${post.id}/preview`}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-soft-grey hover:bg-gray-100 hover:text-charcoal transition-colors"
        >
          <ExternalLink size={13} />
          <span className="hidden sm:inline">Ver</span>
        </Link>

        {/* Editar */}
        <Link
          to={`/admin/blog/${post.id}/editar`}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Pencil size={13} />
          <span className="hidden sm:inline">Editar</span>
        </Link>

        {/* Eliminar */}
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={13} />
          <span className="hidden sm:inline">Eliminar</span>
        </button>
      </div>
    </div>
  )
}
