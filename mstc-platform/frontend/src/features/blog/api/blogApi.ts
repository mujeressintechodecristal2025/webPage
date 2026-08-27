import apiClient from '@/shared/api/client'
import type { BlogPostDetail, BlogPostSummary, Page } from '@/shared/types'

/**
 * Obtiene la lista paginada de posts publicados.
 * GET /api/v1/blog?page=0&size=9&category=noticias
 */
export const getBlogPosts = async (
  page = 0,
  size = 9,
  category?: string,
): Promise<Page<BlogPostSummary>> => {
  const params: Record<string, string | number> = { page, size }
  if (category && category.trim()) params.category = category

  const response = await apiClient.get<Page<BlogPostSummary>>('/api/v1/blog', { params })
  return response.data
}

/**
 * Obtiene el detalle completo de un post publicado por su slug.
 * GET /api/v1/blog/{slug}
 * Lanza ProblemDetail con status 404 si no existe o está en DRAFT.
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPostDetail> => {
  const response = await apiClient.get<BlogPostDetail>(`/api/v1/blog/${slug}`)
  return response.data
}
