CREATE TABLE blog_post (
    id           UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    slug         VARCHAR(255) NOT NULL UNIQUE,
    title        VARCHAR(255) NOT NULL,
    excerpt      CLOB,
    body         CLOB         NOT NULL,
    image_s3_key VARCHAR(500),
    category     VARCHAR(100),
    tags         CLOB,
    status       VARCHAR(20)  NOT NULL DEFAULT 'DRAFT',
    author_name  VARCHAR(255),
    author_id    UUID         REFERENCES admin_user(id) ON DELETE SET NULL,
    published_at TIMESTAMP,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_post_status_published ON blog_post(status, published_at DESC);
CREATE INDEX idx_blog_post_slug             ON blog_post(slug);
CREATE INDEX idx_blog_post_category         ON blog_post(category, status);
