CREATE TABLE content_item (
    id           UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    section      VARCHAR(20)  NOT NULL,
    title        VARCHAR(255) NOT NULL,
    body         CLOB,
    image_s3_key VARCHAR(500),
    published    BOOLEAN      NOT NULL DEFAULT FALSE,
    sort_order   INT          NOT NULL DEFAULT 0,
    updated_by   UUID         REFERENCES admin_user(id),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_item_section ON content_item(section, published);

CREATE TABLE project (
    id           UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  CLOB         NOT NULL,
    image_s3_key VARCHAR(500),
    phase        VARCHAR(100),
    tags         CLOB,
    featured     BOOLEAN      NOT NULL DEFAULT FALSE,
    published    BOOLEAN      NOT NULL DEFAULT FALSE,
    sort_order   INT          NOT NULL DEFAULT 0,
    updated_by   UUID         REFERENCES admin_user(id),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE contact_message (
    id         UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    subject    VARCHAR(255) NOT NULL,
    message    CLOB         NOT NULL,
    status     VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);
