package org.mstc.platform.modules.blog.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.port.out.BlogPostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

/**
 * Adaptador de persistencia — implementa el puerto BlogPostRepository
 * usando Spring Data JPA (BlogPostJpaRepository).
 *
 * Es el único punto de contacto entre el dominio y la base de datos.
 */
@Component
@RequiredArgsConstructor
public class BlogPostRepositoryAdapter implements BlogPostRepository {

    private final BlogPostJpaRepository jpaRepository;

    // ── Consultas públicas ────────────────────────────────────────────────

    @Override
    public Page<BlogPost> findPublished(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return jpaRepository
                .findByStatusOrderByPublishedAtDesc("PUBLISHED", pageable)
                .map(BlogPostJpaEntity::toDomain);
    }

    @Override
    public Page<BlogPost> findPublishedByCategory(String category, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return jpaRepository
                .findByStatusAndCategoryOrderByPublishedAtDesc("PUBLISHED", category, pageable)
                .map(BlogPostJpaEntity::toDomain);
    }

    // ── Consultas admin ───────────────────────────────────────────────────

    @Override
    public Page<BlogPost> findAll(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return jpaRepository.findAll(pageable)
                .map(BlogPostJpaEntity::toDomain);
    }

    // ── Búsquedas individuales ────────────────────────────────────────────

    @Override
    public Optional<BlogPost> findBySlug(String slug) {
        return jpaRepository.findBySlug(slug)
                .map(BlogPostJpaEntity::toDomain);
    }

    @Override
    public Optional<BlogPost> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(BlogPostJpaEntity::toDomain);
    }

    // ── Persistencia ──────────────────────────────────────────────────────

    @Override
    public BlogPost save(BlogPost post) {
        BlogPostJpaEntity entity = BlogPostJpaEntity.fromDomain(post);
        return jpaRepository.save(entity).toDomain();
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    // ── Verificaciones de unicidad ────────────────────────────────────────

    @Override
    public boolean existsBySlug(String slug) {
        return jpaRepository.existsBySlug(slug);
    }

    @Override
    public boolean existsBySlugAndIdNot(String slug, UUID id) {
        return jpaRepository.existsBySlugAndIdNot(slug, id);
    }
}
