package org.mstc.platform.modules.blog.adapter.out.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repositorio Spring Data JPA para blog_post.
 * Solo usado por BlogPostRepositoryAdapter — nunca por el dominio directamente.
 */
public interface BlogPostJpaRepository extends JpaRepository<BlogPostJpaEntity, UUID> {

    /** Posts por estado, ordenados por published_at DESC. */
    Page<BlogPostJpaEntity> findByStatusOrderByPublishedAtDesc(
            String status, Pageable pageable);

    /** Posts por estado y categoría, ordenados por published_at DESC. */
    Page<BlogPostJpaEntity> findByStatusAndCategoryOrderByPublishedAtDesc(
            String status, String category, Pageable pageable);

    /** Busca por slug exacto. */
    Optional<BlogPostJpaEntity> findBySlug(String slug);

    /** Verifica existencia de slug. */
    boolean existsBySlug(String slug);

    /** Verifica slug en otro post (para validar edición sin falsos positivos). */
    boolean existsBySlugAndIdNot(String slug, UUID id);
}
