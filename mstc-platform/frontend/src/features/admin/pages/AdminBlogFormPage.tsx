import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import BlogPostForm from '@/features/admin/components/BlogPostForm'
import { getAdminBlogPost } from '@/features/admin/api/adminBlogApi'
import { useCreateBlogPost, useUpdateBlogPost } from '@/features/admin/hooks/useAdminBlogMutations'
import type { BlogPostFormData, ProblemDetail } from '@/shared/types'

/**
 * Página de creación/edición de post del blog en el panel admin.
 * Ruta crear:  /admin/blog/nuevo
 * Ruta editar: /admin/blog/:id/editar
 *
 * Detecta el modo por la presencia del parámetro :id en la URL.
 */
export default function AdminBlogFormPage() {
  const { id }     = useParams<{ id: string }>()
  const navigate   = useNavigate()
  const isEditMode = !!id

  // Cargar post existente en modo edición
  const {
    data:      existingPost,
    isLoading: isLoadingPost,
  } = useQuery({
    queryKey: ['admin', 'blog', 'post', id],
    queryFn:  () => getAdminBlogPost(id!),
    enabled:  isEditMode,
    staleTime: 0, // siempre fresco al editar
  })

  const createMutation = useCreateBlogPost()
  const updateMutation = useUpdateBlogPost(id ?? '')

  const mutation      = isEditMode ? updateMutation : createMutation
  const serverError   = mutation.isError
    ? ((mutation.error as unknown as ProblemDetail)?.detail ?? 'Error al guardar el post.')
    : null

  const handleSubmit = async (data: BlogPostFormData) => {
    try {
      await mutation.mutateAsync(data)
      navigate('/admin/blog', { replace: true })
    } catch {
      // El error se muestra via serverError del mutation
    }
  }

  // Preparar defaultValues para el formulario
  const defaultValues: Partial<BlogPostFormData> | undefined = existingPost
    ? {
        title:      existingPost.title,
        slug:       existingPost.slug,
        excerpt:    existingPost.excerpt    ?? '',
        body:       existingPost.body       ?? '',
        imageS3Key: existingPost.imageS3Key ?? '',
        category:   existingPost.category   ?? '',
        tags:       existingPost.tags       ?? [],
        status:     existingPost.status,
        authorName: existingPost.authorName ?? '',
      }
    : undefined

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/admin/blog')}
          className="flex items-center gap-1.5 text-sm text-soft-grey hover:text-charcoal transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver
        </button>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl text-charcoal">
          {isEditMode ? 'Editar post' : 'Nuevo post'}
        </h1>
      </div>

      {/* Cargando post en modo edición */}
      {isEditMode && isLoadingPost && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4 animate-pulse shadow-sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-10 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Formulario */}
      {(!isEditMode || (isEditMode && !isLoadingPost)) && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <BlogPostForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
            serverError={serverError}
            mode={isEditMode ? 'edit' : 'create'}
            postId={id}
          />
        </div>
      )}
    </div>
  )
}
