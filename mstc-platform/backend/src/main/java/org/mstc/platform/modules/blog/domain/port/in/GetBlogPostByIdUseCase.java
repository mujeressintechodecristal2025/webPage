package org.mstc.platform.modules.blog.domain.port.in;

import org.mstc.platform.modules.blog.domain.model.BlogPost;

import java.util.Optional;
import java.util.UUID;

/**
 * Caso de uso: obtener un post por su id interno.
 * Retorna cualquier estado (DRAFT o PUBLISHED).
 * Usado exclusivamente por el panel de administración.
 */
public interface GetBlogPostByIdUseCase {

    /**
     * Busca un post por su UUID interno.
     *
     * @param id identificador interno del post
     * @return Optional vacío si no existe
     */
    Optional<BlogPost> getById(UUID id);
}
