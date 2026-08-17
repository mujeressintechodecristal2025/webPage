import { useQuery } from '@tanstack/react-query'
import { getAdminBlogPosts } from '@/features/admin/api/adminBlogApi'

/**
 * Hook para obtener todos los posts (DRAFT + PUBLISHED) en el panel admin.
 */
export const useAdminBlogPosts = (page = 0) =>
  useQuery({
    queryKey: ['admin', 'blog', 'list', page],
    queryFn: () => getAdminBlogPosts(page, 10),
    staleTime: 1 * 60 * 1000, // 1 minuto — el admin ve cambios más frescos
    placeholderData: (prev) => prev,
  })
