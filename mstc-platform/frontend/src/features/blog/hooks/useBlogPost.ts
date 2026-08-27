import { useQuery } from '@tanstack/react-query'
import { getBlogPostBySlug } from '@/features/blog/api/blogApi'

/**
 * Hook para obtener el detalle de un post publicado por slug.
 * Solo se ejecuta cuando el slug es válido (enabled: !!slug).
 */
export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: ['blog', 'post', slug],
    queryFn: () => getBlogPostBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
    retry: (failureCount, error: any) => {
      // No reintentar si es 404 — el post no existe o está en DRAFT
      if (error?.status === 404) return false
      return failureCount < 1
    },
  })
