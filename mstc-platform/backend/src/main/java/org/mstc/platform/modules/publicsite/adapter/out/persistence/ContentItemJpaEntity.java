package org.mstc.platform.modules.publicsite.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.mstc.platform.modules.publicsite.domain.model.ContentItem;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "content_item")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ContentItemJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 20)
    private String section;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Column(name = "image_s3_key", length = 500)
    private String imageS3Key;

    @Column(nullable = false)
    private boolean published;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist  void prePersist() { createdAt = updatedAt = Instant.now(); }
    @PreUpdate   void preUpdate()  { updatedAt = Instant.now(); }

    public static ContentItemJpaEntity fromDomain(ContentItem d) {
        return ContentItemJpaEntity.builder()
                .id(d.getId()).section(d.getSection()).title(d.getTitle())
                .body(d.getBody()).imageS3Key(d.getImageS3Key())
                .published(d.isPublished()).sortOrder(d.getSortOrder())
                .updatedAt(d.getUpdatedAt()).build();
    }

    public ContentItem toDomain() {
        return ContentItem.builder()
                .id(id).section(section).title(title).body(body)
                .imageS3Key(imageS3Key).published(published)
                .sortOrder(sortOrder).updatedAt(updatedAt).build();
    }
}
