package org.mstc.platform.modules.blog.domain.port.in;

import java.util.UUID;

/**
 * Caso de uso: eliminar un post del blog de forma permanente.
 * Solo accesible para administradores (ROLE_ADMIN).
 */
public interface DeleteBlogPostUseCase {

    /**
     * Elimina un post por su id.
     * Lanza NotFoundException si el post no existe.
     *
     * @param id identificador interno del post
     */
    void delete(UUID id);
}
