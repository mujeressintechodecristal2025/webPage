-- ============================================================
-- V8 — Tabla de Blog (BlogModule)
-- ============================================================

CREATE TABLE blog_post (
    id           UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug         VARCHAR(255) NOT NULL UNIQUE,
    title        VARCHAR(255) NOT NULL,
    excerpt      TEXT,
    body         TEXT         NOT NULL,
    image_s3_key VARCHAR(500),
    category     VARCHAR(100),
    tags         TEXT[],
    status       VARCHAR(20)  NOT NULL DEFAULT 'DRAFT',  -- DRAFT | PUBLISHED
    author_name  VARCHAR(255),
    author_id    UUID         REFERENCES admin_user(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Consulta principal del blog público: posts publicados ordenados por fecha
CREATE INDEX idx_blog_post_status_published
    ON blog_post(status, published_at DESC);

-- Lookup por slug (GET /api/v1/blog/{slug})
CREATE INDEX idx_blog_post_slug
    ON blog_post(slug);

-- Filtro por categoría en la lista pública
CREATE INDEX idx_blog_post_category
    ON blog_post(category, status);
