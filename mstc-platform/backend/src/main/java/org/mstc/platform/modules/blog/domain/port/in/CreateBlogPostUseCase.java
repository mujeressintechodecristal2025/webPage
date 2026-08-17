package org.mstc.platform.modules.blog.domain.port.in;

import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.model.BlogStatus;

import java.util.List;
import java.util.UUID;

/**
 * Caso de uso: crear un nuevo post del blog.
 * Solo accesible para administradores (ROLE_ADMIN).
 */
public interface CreateBlogPostUseCase {

    record CreateCommand(
            String       slug,
            String       title,
            String       excerpt,
            String       body,
            String       imageS3Key,
            String       category,
            List<String> tags,
            UUID         authorId,
            String       authorName,
            BlogStatus   status
    ) {}

    /**
     * Crea un nuevo post.
     * Lanza BusinessConflictException si el slug ya existe.
     *
     * @param command datos del post a crear
     * @return el post creado con su id asignado
     */
    BlogPost create(CreateCommand command);
}
