package org.mstc.platform.modules.blog.domain.port.in;

import java.util.UUID;

/**
 * Caso de uso: verificar si un slug está disponible.
 * Usado por el panel admin para validación en tiempo real.
 */
public interface CheckSlugUseCase {

    /**
     * @param slug      slug a verificar
     * @param excludeId id del post a excluir (para edición); null en creación
     * @return true si el slug está disponible (no lo usa otro post)
     */
    boolean isSlugAvailable(String slug, UUID excludeId);
}
