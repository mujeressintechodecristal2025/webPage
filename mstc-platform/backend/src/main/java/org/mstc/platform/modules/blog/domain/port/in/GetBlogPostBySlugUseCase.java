package org.mstc.platform.modules.blog.domain.port.in;

import org.mstc.platform.modules.blog.domain.model.BlogPost;

import java.util.Optional;

/**
 * Caso de uso: obtener un post por su slug.
 * Solo retorna posts con status PUBLISHED.
 * Usado por el detalle público (/api/v1/blog/{slug}).
 */
public interface GetBlogPostBySlugUseCase {

    /**
     * Busca un post publicado por su slug.
     *
     * @param slug identificador URL del post
     * @return Optional vacío si no existe o está en DRAFT
     */
    Optional<BlogPost> getBySlug(String slug);
}
