import apiClient from '@/shared/api/client'
import type { BlogPostAdmin, BlogPostFormData, Page } from '@/shared/types'

/**
 * Lista todos los posts (DRAFT + PUBLISHED) para el panel admin.
 * GET /api/v1/admin/blog?page=0&size=10
 */
export const getAdminBlogPosts = async (
  page = 0,
  size = 10,
): Promise<Page<BlogPostAdmin>> => {
  const response = await apiClient.get<Page<BlogPostAdmin>>('/api/v1/admin/blog', {
    params: { page, size },
  })
  return response.data
}

/**
 * Obtiene un post por su id interno (cualquier estado).
 * GET /api/v1/admin/blog/{id}
 */
export const getAdminBlogPost = async (id: string): Promise<BlogPostAdmin> => {
  const response = await apiClient.get<BlogPostAdmin>(`/api/v1/admin/blog/${id}`)
  return response.data
}

/**
 * Crea un nuevo post.
 * POST /api/v1/admin/blog
 */
export const createBlogPost = async (data: BlogPostFormData): Promise<BlogPostAdmin> => {
  const response = await apiClient.post<BlogPostAdmin>('/api/v1/admin/blog', data)
  return response.data
}

/**
 * Actualiza un post existente.
 * PUT /api/v1/admin/blog/{id}
 */
export const updateBlogPost = async (
  id: string,
  data: BlogPostFormData,
): Promise<BlogPostAdmin> => {
  const response = await apiClient.put<BlogPostAdmin>(`/api/v1/admin/blog/${id}`, data)
  return response.data
}

/**
 * Elimina un post de forma permanente.
 * DELETE /api/v1/admin/blog/{id}
 */
export const deleteBlogPost = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/v1/admin/blog/${id}`)
}

/**
 * Verifica si un slug está disponible.
 * GET /api/v1/admin/blog/slug-available?slug=...&excludeId=...
 */
export const checkSlugAvailable = async (
  slug: string,
  excludeId?: string,
): Promise<boolean> => {
  const response = await apiClient.get<{ available: boolean }>(
    '/api/v1/admin/blog/slug-available',
    { params: { slug, ...(excludeId && { excludeId }) } },
  )
  return response.data.available
}

/**
 * Sube una imagen al servidor y retorna su URL pública.
 * POST /api/v1/admin/blog/images (multipart/form-data)
 */
export const uploadBlogImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<{ url: string }>(
    '/api/v1/admin/blog/images',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )
  return response.data.url
}
