package org.mstc.platform.modules.blog.adapter.in.web;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.model.BlogStatus;
import org.mstc.platform.modules.blog.domain.port.in.CreateBlogPostUseCase;
import org.mstc.platform.modules.blog.domain.port.in.DeleteBlogPostUseCase;
import org.mstc.platform.modules.blog.domain.port.in.GetAllBlogPostsUseCase;
import org.mstc.platform.modules.blog.domain.port.in.GetBlogPostByIdUseCase;
import org.mstc.platform.modules.blog.domain.port.in.UpdateBlogPostUseCase;
import org.mstc.platform.shared.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controlador administrativo del blog.
 * Todas las rutas requieren rol ADMIN (JWT).
 *
 * GET    /api/v1/admin/blog            → listar todos los posts (DRAFT + PUBLISHED)
 * GET    /api/v1/admin/blog/{id}       → obtener post por id
 * POST   /api/v1/admin/blog            → crear post
 * PUT    /api/v1/admin/blog/{id}       → editar post
 * DELETE /api/v1/admin/blog/{id}       → eliminar post
 */
@RestController
@RequestMapping("/api/v1/admin/blog")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class BlogAdminController {

    private final GetAllBlogPostsUseCase getBlogPostsUseCase;
    private final GetBlogPostByIdUseCase getBlogPostByIdUseCase;
    private final CreateBlogPostUseCase  createBlogPostUseCase;
    private final UpdateBlogPostUseCase  updateBlogPostUseCase;
    private final DeleteBlogPostUseCase  deleteBlogPostUseCase;

    // ── GET /api/v1/admin/blog ────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<BlogAdminPageResponse> getAllPosts(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "10") int size) {

        // getAllPosts devuelve DRAFT + PUBLISHED, ordenados por createdAt DESC
        Page<BlogPost> result = getBlogPostsUseCase.getAllPosts(page, size);

        List<BlogPostAdminResponse> content = result.getContent().stream()
                .map(BlogAdminController::toAdminResponse)
                .toList();

        return ResponseEntity.ok(new BlogAdminPageResponse(
                content,
                result.getTotalElements(),
                result.getTotalPages(),
                result.getNumber(),
                result.getSize()
        ));
    }

    // ── GET /api/v1/admin/blog/{id} ───────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostAdminResponse> getById(@PathVariable UUID id) {
        BlogPost post = getBlogPostByIdUseCase.getById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", id));
        return ResponseEntity.ok(toAdminResponse(post));
    }

    // ── POST /api/v1/admin/blog ───────────────────────────────────────────

    @PostMapping
    public ResponseEntity<BlogPostAdminResponse> createPost(
            @Valid @RequestBody CreateBlogPostRequest request,
            @AuthenticationPrincipal String authorId) {

        BlogPost created = createBlogPostUseCase.create(
                new CreateBlogPostUseCase.CreateCommand(
                        request.slug(),
                        request.title(),
                        request.excerpt(),
                        request.body(),
                        request.imageS3Key(),
                        request.category(),
                        request.tags() != null ? request.tags() : List.of(),
                        authorId != null ? UUID.fromString(authorId) : null,
                        request.authorName(),
                        request.status() != null ? request.status() : BlogStatus.DRAFT
                )
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(toAdminResponse(created));
    }

    // ── PUT /api/v1/admin/blog/{id} ───────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostAdminResponse> updatePost(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateBlogPostRequest request) {

        BlogPost updated = updateBlogPostUseCase.update(
                new UpdateBlogPostUseCase.UpdateCommand(
                        id,
                        request.title(),
                        request.slug(),
                        request.excerpt(),
                        request.body(),
                        request.imageS3Key(),
                        request.category(),
                        request.tags() != null ? request.tags() : List.of(),
                        request.status() != null ? request.status() : BlogStatus.DRAFT
                )
        );

        return ResponseEntity.ok(toAdminResponse(updated));
    }

    // ── DELETE /api/v1/admin/blog/{id} ────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        deleteBlogPostUseCase.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── Mapper ────────────────────────────────────────────────────────────

    private static BlogPostAdminResponse toAdminResponse(BlogPost p) {
        return new BlogPostAdminResponse(
                p.getId().toString(),
                p.getSlug(),
                p.getTitle(),
                p.getExcerpt(),
                p.getBody(),
                p.getImageS3Key(),
                p.getCategory(),
                p.getTags() != null ? p.getTags() : List.of(),
                p.getStatus().name(),
                p.getAuthorName(),
                p.getPublishedAt()  != null ? p.getPublishedAt().toString()  : null,
                p.getCreatedAt()    != null ? p.getCreatedAt().toString()    : null,
                p.getUpdatedAt()    != null ? p.getUpdatedAt().toString()    : null
        );
    }

    // ── DTOs de request ───────────────────────────────────────────────────

    record CreateBlogPostRequest(
            @NotBlank(message = "El título es obligatorio")
            String title,

            @NotBlank(message = "El slug es obligatorio")
            @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                     message = "El slug solo puede contener minúsculas, números y guiones")
            String slug,

            String excerpt,

            @NotBlank(message = "El contenido es obligatorio")
            String body,

            String imageS3Key,
            String category,
            List<String> tags,
            String authorName,
            BlogStatus status
    ) {}

    record UpdateBlogPostRequest(
            @NotBlank(message = "El título es obligatorio")
            String title,

            @NotBlank(message = "El slug es obligatorio")
            @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                     message = "El slug solo puede contener minúsculas, números y guiones")
            String slug,

            String excerpt,

            @NotBlank(message = "El contenido es obligatorio")
            String body,

            String imageS3Key,
            String category,
            List<String> tags,

            @NotNull(message = "El estado es obligatorio")
            BlogStatus status
    ) {}

    // ── DTOs de respuesta ─────────────────────────────────────────────────

    record BlogPostAdminResponse(
            String       id,
            String       slug,
            String       title,
            String       excerpt,
            String       body,
            String       imageS3Key,
            String       category,
            List<String> tags,
            String       status,
            String       authorName,
            String       publishedAt,
            String       createdAt,
            String       updatedAt
    ) {}

    record BlogAdminPageResponse(
            List<BlogPostAdminResponse> content,
            long totalElements,
            int  totalPages,
            int  number,
            int  size
    ) {}
}
