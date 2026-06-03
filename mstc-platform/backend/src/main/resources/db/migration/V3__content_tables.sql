-- ============================================================
-- V3 — Tablas de contenido público y CMS (PublicSiteModule + CMSModule)
-- ============================================================

CREATE TABLE content_item (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    section     VARCHAR(20) NOT NULL,   -- INICIO, NOSOTROS, PROYECTOS, CONTACTO
    title       VARCHAR(255) NOT NULL,
    body        TEXT,
    image_s3_key VARCHAR(500),
    published   BOOLEAN     NOT NULL DEFAULT FALSE,
    sort_order  INT         NOT NULL DEFAULT 0,
    updated_by  UUID        REFERENCES admin_user(id),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_item_section ON content_item(section, published);

CREATE TABLE project (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       VARCHAR(255) NOT NULL,
    description TEXT        NOT NULL,
    image_s3_key VARCHAR(500),
    phase       VARCHAR(100),
    tags        TEXT[],
    featured    BOOLEAN     NOT NULL DEFAULT FALSE,
    published   BOOLEAN     NOT NULL DEFAULT FALSE,
    sort_order  INT         NOT NULL DEFAULT 0,
    updated_by  UUID        REFERENCES admin_user(id),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contact_message (
    id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    subject    VARCHAR(255) NOT NULL,
    message    TEXT        NOT NULL,
    status     VARCHAR(20) NOT NULL DEFAULT 'PENDING',  -- PENDING, READ, REPLIED
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
