package org.mstc.platform.modules.blog.domain.port.out;

import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

/**
 * Puerto de salida del módulo Blog.
 * Define el contrato de persistencia sin acoplarse a JPA ni Spring Data.
 * La implementación vive en adapter/out/persistence.
 */
public interface BlogPostRepository {

    /** Posts publicados, ordenados por publishedAt DESC. */
    Page<BlogPost> findPublished(int page, int size);

    /** Posts publicados filtrados por categoría, ordenados por publishedAt DESC. */
    Page<BlogPost> findPublishedByCategory(String category, int page, int size);

    /** Todos los posts (DRAFT + PUBLISHED), para el panel admin. */
    Page<BlogPost> findAll(int page, int size);

    /** Busca por slug — retorna cualquier estado. */
    Optional<BlogPost> findBySlug(String slug);

    /** Busca por id interno — retorna cualquier estado. */
    Optional<BlogPost> findById(UUID id);

    /** Crea o actualiza un post. */
    BlogPost save(BlogPost post);

    /** Elimina un post por su id. */
    void deleteById(UUID id);

    /** Verifica si ya existe un post con ese slug. */
    boolean existsBySlug(String slug);

    /** Verifica si existe otro post con ese slug (excluye el id dado — usado al editar). */
    boolean existsBySlugAndIdNot(String slug, UUID id);
}
