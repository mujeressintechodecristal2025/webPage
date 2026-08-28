package org.mstc.platform.modules.blog.domain.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.model.BlogStatus;
import org.mstc.platform.modules.blog.domain.port.in.*;
import org.mstc.platform.modules.blog.domain.port.in.GetBlogPostByIdUseCase;
import org.mstc.platform.modules.blog.domain.port.in.GetAllBlogPostsUseCase;
import org.mstc.platform.modules.blog.domain.port.in.CheckSlugUseCase;
import org.mstc.platform.modules.blog.domain.port.out.BlogPostRepository;
import org.mstc.platform.shared.exception.BusinessConflictException;
import org.mstc.platform.shared.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

/**
 * Servicio de dominio del módulo Blog.
 *
 * Implementa todos los casos de uso de blog:
 * - GetBlogPostsUseCase       (lista pública paginada)
 * - GetBlogPostBySlugUseCase  (detalle público por slug)
 * - CreateBlogPostUseCase     (admin: crear post)
 * - UpdateBlogPostUseCase     (admin: editar post)
 * - DeleteBlogPostUseCase     (admin: eliminar post)
 *
 * Reglas de negocio:
 * - La vista pública solo ve posts con status PUBLISHED
 * - Al publicar por primera vez se registra publishedAt
 * - Al despublicar se conserva publishedAt (historial)
 * - El slug debe ser único globalmente
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BlogService implements
        GetBlogPostsUseCase,
        GetAllBlogPostsUseCase,
        GetBlogPostBySlugUseCase,
        GetBlogPostByIdUseCase,
        CreateBlogPostUseCase,
        UpdateBlogPostUseCase,
        DeleteBlogPostUseCase,
        CheckSlugUseCase {

    private final BlogPostRepository blogPostRepository;

    // ── Lista pública ─────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Page<BlogPost> getPosts(int page, int size, String category) {
        boolean hasCategory = category != null && !category.isBlank();
        return hasCategory
                ? blogPostRepository.findPublishedByCategory(category, page, size)
                : blogPostRepository.findPublished(page, size);
    }

    // ── Lista admin (todos los estados) ───────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Page<BlogPost> getAllPosts(int page, int size) {
        return blogPostRepository.findAll(page, size);
    }

    // ── Detalle público ───────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Optional<BlogPost> getBySlug(String slug) {
        return blogPostRepository.findBySlug(slug)
                .filter(post -> post.getStatus() == BlogStatus.PUBLISHED);
    }

    // ── Detalle admin (cualquier estado) ──────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public Optional<BlogPost> getById(UUID id) {
        return blogPostRepository.findById(id);
    }

    // ── Crear post (admin) ────────────────────────────────────────────────

    @Override
    public BlogPost create(CreateCommand command) {
        if (blogPostRepository.existsBySlug(command.slug())) {
            throw new BusinessConflictException(
                    "Ya existe un post con el slug: " + command.slug());
        }

        Instant now = Instant.now();
        Instant publishedAt = command.status() == BlogStatus.PUBLISHED ? now : null;

        BlogPost post = BlogPost.builder()
                .id(UUID.randomUUID())
                .slug(command.slug())
                .title(command.title())
                .excerpt(command.excerpt())
                .body(command.body())
                .imageS3Key(command.imageS3Key())
                .category(command.category())
                .tags(command.tags())
                .status(command.status())
                .authorId(command.authorId())
                .authorName(command.authorName())
                .publishedAt(publishedAt)
                .createdAt(now)
                .updatedAt(now)
                .build();

        BlogPost saved = blogPostRepository.save(post);
        log.info("Post creado: id={} slug='{}' status={}", saved.getId(), saved.getSlug(), saved.getStatus());
        return saved;
    }

    // ── Editar post (admin) ───────────────────────────────────────────────

    @Override
    public BlogPost update(UpdateCommand command) {
        BlogPost existing = blogPostRepository.findById(command.id())
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", command.id()));

        // Validar slug único si cambió
        if (!existing.getSlug().equals(command.slug())
                && blogPostRepository.existsBySlugAndIdNot(command.slug(), command.id())) {
            throw new BusinessConflictException(
                    "Ya existe un post con el slug: " + command.slug());
        }

        // Registrar publishedAt solo la primera vez que se publica
        Instant publishedAt = existing.getPublishedAt();
        if (command.status() == BlogStatus.PUBLISHED && publishedAt == null) {
            publishedAt = Instant.now();
        }

        BlogPost updated = BlogPost.builder()
                .id(existing.getId())
                .slug(command.slug())
                .title(command.title())
                .excerpt(command.excerpt())
                .body(command.body())
                .imageS3Key(command.imageS3Key())
                .category(command.category())
                .tags(command.tags())
                .status(command.status())
                .authorId(existing.getAuthorId())
                .authorName(command.authorName() != null && !command.authorName().isBlank()
                        ? command.authorName()
                        : existing.getAuthorName())
                .publishedAt(publishedAt)
                .createdAt(existing.getCreatedAt())
                .updatedAt(Instant.now())
                .build();

        BlogPost saved = blogPostRepository.save(updated);
        log.info("Post actualizado: id={} slug='{}' status={}", saved.getId(), saved.getSlug(), saved.getStatus());
        return saved;
    }

    // ── Eliminar post (admin) ─────────────────────────────────────────────

    @Override
    public void delete(UUID id) {
        if (!blogPostRepository.findById(id).isPresent()) {
            throw new ResourceNotFoundException("BlogPost", id);
        }
        blogPostRepository.deleteById(id);
        log.info("Post eliminado: id={}", id);
    }

    // ── Verificar disponibilidad de slug ──────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public boolean isSlugAvailable(String slug, UUID excludeId) {
        if (slug == null || slug.isBlank()) return false;
        return excludeId == null
                ? !blogPostRepository.existsBySlug(slug)
                : !blogPostRepository.existsBySlugAndIdNot(slug, excludeId);
    }
}
