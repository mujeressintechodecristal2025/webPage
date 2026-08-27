package org.mstc.platform.modules.blog.domain.port.in;

import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.springframework.data.domain.Page;

/**
 * Caso de uso: obtener lista paginada de posts publicados.
 * Usado por el blog público (/api/v1/blog).
 */
public interface GetBlogPostsUseCase {

    /**
     * Retorna posts con status PUBLISHED, ordenados por publishedAt DESC.
     *
     * @param page     número de página (0-indexed)
     * @param size     cantidad de posts por página
     * @param category filtro opcional por categoría; null o vacío = sin filtro
     */
    Page<BlogPost> getPosts(int page, int size, String category);
}
