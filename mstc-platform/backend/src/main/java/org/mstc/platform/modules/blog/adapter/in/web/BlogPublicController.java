package org.mstc.platform.modules.blog.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.port.in.GetBlogPostBySlugUseCase;
import org.mstc.platform.modules.blog.domain.port.in.GetBlogPostsUseCase;
import org.mstc.platform.shared.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

/**
 * Controlador público del blog.
 * Rutas sin autenticación — accesibles por cualquier visitante.
 *
 * GET /api/v1/blog              → lista paginada de posts publicados
 * GET /api/v1/blog/{slug}       → detalle de un post por slug
 */
@RestController
@RequestMapping("/api/v1/blog")
@RequiredArgsConstructor
public class BlogPublicController {

    private final GetBlogPostsUseCase      getBlogPostsUseCase;
    private final GetBlogPostBySlugUseCase getBlogPostBySlugUseCase;

    // ── GET /api/v1/blog ──────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<BlogPageResponse> getPosts(
            @RequestParam(defaultValue = "0")  int    page,
            @RequestParam(defaultValue = "9")  int    size,
            @RequestParam(required = false)    String category) {

        Page<BlogPost> result = getBlogPostsUseCase.getPosts(page, size, category);

        List<BlogPostSummaryResponse> content = result.getContent().stream()
                .map(BlogPublicController::toSummary)
                .toList();

        return ResponseEntity.ok(new BlogPageResponse(
                content,
                result.getTotalElements(),
                result.getTotalPages(),
                result.getNumber(),
                result.getSize()
        ));
    }

    // ── GET /api/v1/blog/{slug} ───────────────────────────────────────────

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDetailResponse> getBySlug(@PathVariable String slug) {
        BlogPost post = getBlogPostBySlugUseCase.getBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Post con slug '" + slug + "' no encontrado o no está publicado"));

        return ResponseEntity.ok(toDetail(post));
    }

    // ── Mappers ───────────────────────────────────────────────────────────

    private static BlogPostSummaryResponse toSummary(BlogPost p) {
        return new BlogPostSummaryResponse(
                p.getId().toString(),
                p.getSlug(),
                p.getTitle(),
                p.getExcerpt(),
                p.getImageS3Key(),
                p.getCategory(),
                p.getTags() != null ? p.getTags() : List.of(),
                p.getAuthorName(),
                p.getPublishedAt() != null ? p.getPublishedAt().toString() : null
        );
    }

    private static BlogPostDetailResponse toDetail(BlogPost p) {
        return new BlogPostDetailResponse(
                p.getId().toString(),
                p.getSlug(),
                p.getTitle(),
                p.getExcerpt(),
                p.getBody(),
                p.getImageS3Key(),
                p.getCategory(),
                p.getTags() != null ? p.getTags() : List.of(),
                p.getAuthorName(),
                p.getPublishedAt() != null ? p.getPublishedAt().toString() : null,
                p.getUpdatedAt() != null ? p.getUpdatedAt().toString() : null
        );
    }

    // ── DTOs de respuesta ─────────────────────────────────────────────────

    record BlogPostSummaryResponse(
            String       id,
            String       slug,
            String       title,
            String       excerpt,
            String       imageS3Key,
            String       category,
            List<String> tags,
            String       authorName,
            String       publishedAt
    ) {}

    record BlogPostDetailResponse(
            String       id,
            String       slug,
            String       title,
            String       excerpt,
            String       body,
            String       imageS3Key,
            String       category,
            List<String> tags,
            String       authorName,
            String       publishedAt,
            String       updatedAt
    ) {}

    record BlogPageResponse(
            List<BlogPostSummaryResponse> content,
            long totalElements,
            int  totalPages,
            int  number,
            int  size
    ) {}
}
