package org.mstc.platform.modules.blog.domain.port.in;

import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.springframework.data.domain.Page;

/**
 * Caso de uso: obtener todos los posts (DRAFT + PUBLISHED) para el panel admin.
 * Solo accesible para administradores (ROLE_ADMIN).
 */
public interface GetAllBlogPostsUseCase {

    /**
     * Retorna todos los posts sin filtro de estado, ordenados por createdAt DESC.
     *
     * @param page número de página (0-indexed)
     * @param size cantidad de posts por página
     */
    Page<BlogPost> getAllPosts(int page, int size);
}
