import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '@/features/blog/api/blogApi'

/**
 * Hook para obtener la lista paginada de posts publicados.
 * Cachea por (page, category) durante 5 minutos.
 */
export const useBlogPosts = (page = 0, category?: string) =>
  useQuery({
    queryKey: ['blog', 'list', page, category ?? ''],
    queryFn: () => getBlogPosts(page, 9, category),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev, // mantiene datos anteriores al paginar
  })
