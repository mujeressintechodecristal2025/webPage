-- ============================================================
-- V4 — Repositorio RTE-DIAN (RTERepositoryModule)
-- ============================================================

CREATE TABLE legal_document (
    id                UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_type     VARCHAR(50) NOT NULL,
    -- FINANCIAL_STATEMENT, ASSEMBLY_ACT, DONATION_CERT, BYLAWS, COMPLIANCE_CERT
    fiscal_year       INT,
    title             VARCHAR(255) NOT NULL,
    s3_key            VARCHAR(500) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_size_bytes   BIGINT,
    publicly_visible  BOOLEAN     NOT NULL DEFAULT TRUE,
    uploaded_by       UUID        REFERENCES admin_user(id),
    uploaded_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_legal_doc_type_year ON legal_document(document_type, fiscal_year);
CREATE INDEX idx_legal_doc_visible   ON legal_document(publicly_visible);
