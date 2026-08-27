package org.mstc.platform.modules.blog.domain.model;

/**
 * Estado de publicación de un post del blog.
 * DRAFT    → borrador, no visible en el sitio público.
 * PUBLISHED → publicado, visible en /blog.
 */
public enum BlogStatus {
    DRAFT,
    PUBLISHED
}
