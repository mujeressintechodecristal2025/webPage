package org.mstc.platform.modules.blog.domain.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Modelo de dominio de un post del blog.
 * POJO inmutable — sin anotaciones JPA ni de framework.
 * Sigue el mismo patrón que ContentItem del módulo publicsite.
 */
@Getter
@Builder
public class BlogPost {

    private final UUID         id;
    private final String       slug;
    private final String       title;
    private final String       excerpt;
    private final String       body;
    private final String       imageS3Key;
    private final String       category;
    private final List<String> tags;
    private final BlogStatus   status;
    private final String       authorName;
    private final UUID         authorId;
    private final Instant      publishedAt;
    private final Instant      createdAt;
    private final Instant      updatedAt;
}
