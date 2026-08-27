package org.mstc.platform.modules.blog.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.mstc.platform.modules.blog.domain.model.BlogPost;
import org.mstc.platform.modules.blog.domain.model.BlogStatus;
import org.mstc.platform.shared.persistence.StringListConverter;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Entidad JPA para la tabla blog_post.
 * Solo vive en la capa de adaptador — nunca se expone al dominio.
 * Los métodos fromDomain/toDomain hacen la conversión entre capas.
 */
@Entity
@Table(name = "blog_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogPostJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String excerpt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(name = "image_s3_key", length = 500)
    private String imageS3Key;

    @Column(length = 100)
    private String category;

    // Almacenado como CSV — compatible con PostgreSQL TEXT[] y H2 CLOB
    @Convert(converter = StringListConverter.class)
    @Column(name = "tags")
    private List<String> tags;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(name = "author_name", length = 255)
    private String authorName;

    @Column(name = "author_id")
    private UUID authorId;

    @Column(name = "published_at")
    private Instant publishedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = updatedAt = Instant.now();
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Instant.now();
    }

    // ── Conversión dominio → entidad ──────────────────────────────────────

    public static BlogPostJpaEntity fromDomain(BlogPost d) {
        return BlogPostJpaEntity.builder()
                .id(d.getId())
                .slug(d.getSlug())
                .title(d.getTitle())
                .excerpt(d.getExcerpt())
                .body(d.getBody())
                .imageS3Key(d.getImageS3Key())
                .category(d.getCategory())
                .tags(d.getTags() != null ? d.getTags() : Collections.emptyList())
                .status(d.getStatus().name())
                .authorName(d.getAuthorName())
                .authorId(d.getAuthorId())
                .publishedAt(d.getPublishedAt())
                .createdAt(d.getCreatedAt())
                .updatedAt(d.getUpdatedAt())
                .build();
    }

    // ── Conversión entidad → dominio ──────────────────────────────────────

    public BlogPost toDomain() {
        return BlogPost.builder()
                .id(id)
                .slug(slug)
                .title(title)
                .excerpt(excerpt)
                .body(body)
                .imageS3Key(imageS3Key)
                .category(category)
                .tags(tags != null ? tags : Collections.emptyList())
                .status(BlogStatus.valueOf(status))
                .authorName(authorName)
                .authorId(authorId)
                .publishedAt(publishedAt)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }
}
