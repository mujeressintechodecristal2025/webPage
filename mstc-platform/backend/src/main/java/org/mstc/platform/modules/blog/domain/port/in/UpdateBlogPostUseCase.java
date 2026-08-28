package org.mstc.platform.modules.blog.domain.port.in;

import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.model.BlogStatus;

import java.util.List;
import java.util.UUID;

/**
 * Caso de uso: editar un post existente del blog.
 * Solo accesible para administradores (ROLE_ADMIN).
 */
public interface UpdateBlogPostUseCase {

    record UpdateCommand(
            UUID         id,
            String       title,
            String       slug,
            String       excerpt,
            String       body,
            String       imageS3Key,
            String       category,
            List<String> tags,
            BlogStatus   status,
            String       authorName
    ) {}

    /**
     * Actualiza un post existente.
     * Lanza NotFoundException si el post no existe.
     * Lanza BusinessConflictException si el nuevo slug ya pertenece a otro post.
     *
     * @param command datos actualizados del post
     * @return el post actualizado
     */
    BlogPost update(UpdateCommand command);
}
