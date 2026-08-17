CREATE TABLE legal_document (
    id                UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    document_type     VARCHAR(50)  NOT NULL,
    fiscal_year       INT,
    title             VARCHAR(255) NOT NULL,
    s3_key            VARCHAR(500) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_size_bytes   BIGINT,
    publicly_visible  BOOLEAN      NOT NULL DEFAULT TRUE,
    uploaded_by       UUID         REFERENCES admin_user(id),
    uploaded_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_legal_doc_type_year ON legal_document(document_type, fiscal_year);
CREATE INDEX idx_legal_doc_visible   ON legal_document(publicly_visible);
