import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '@/features/admin/api/adminBlogApi'
import type { BlogPostFormData } from '@/shared/types'

/**
 * Hook para crear un nuevo post.
 * Invalida la lista del admin y del blog público al terminar.
 */
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BlogPostFormData) => createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
      queryClient.invalidateQueries({ queryKey: ['blog', 'list'] })
    },
  })
}

/**
 * Hook para actualizar un post existente.
 * Invalida la lista del admin, del blog público y el detalle del post editado.
 */
export const useUpdateBlogPost = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BlogPostFormData) => updateBlogPost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
      queryClient.invalidateQueries({ queryKey: ['blog', 'list'] })
      // Invalida el detalle público si el post fue publicado
      if (updatedPost.slug) {
        queryClient.invalidateQueries({ queryKey: ['blog', 'post', updatedPost.slug] })
      }
    },
  })
}

/**
 * Hook para eliminar un post.
 * Invalida la lista del admin y del blog público al terminar.
 */
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
      queryClient.invalidateQueries({ queryKey: ['blog', 'list'] })
    },
  })
}
