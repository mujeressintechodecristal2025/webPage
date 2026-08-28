import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '@/features/blog/api/blogApi'
import type { BlogPostSummary } from '@/shared/types'

/**
 * Obtiene posts relacionados: misma categoría, excluyendo el post actual.
 * Si no hay categoría o no hay suficientes, completa con los más recientes.
 */
export const useRelatedPosts = (
  currentSlug: string,
  category?: string,
  limit = 3,
) =>
  useQuery({
    queryKey: ['blog', 'related', currentSlug, category ?? ''],
    queryFn: async (): Promise<BlogPostSummary[]> => {
      // Traer posts de la misma categoría
      const byCategory = category
        ? (await getBlogPosts(0, limit + 1, category)).content
        : []

      let related = byCategory.filter((p) => p.slug !== currentSlug)

      // Completar con recientes si faltan
      if (related.length < limit) {
        const recent = (await getBlogPosts(0, limit + 3)).content
          .filter((p) => p.slug !== currentSlug && !related.some((r) => r.slug === p.slug))
        related = [...related, ...recent]
      }

      return related.slice(0, limit)
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!currentSlug,
  })
