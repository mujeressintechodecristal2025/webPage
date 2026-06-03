-- ============================================================
-- V6 — Tablas de beneficiarias (BeneficiaryModule)
-- Campos sensibles almacenados cifrados con AES-256-GCM
-- El cifrado/descifrado ocurre en la capa Java (AttributeConverter)
-- ============================================================

CREATE TABLE beneficiary (
    id                   UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- Campos cifrados (AES-256-GCM) — almacenados como BYTEA
    full_name_enc        BYTEA       NOT NULL,
    identification_enc   BYTEA       NOT NULL,
    contact_info_enc     BYTEA,
    -- Campos no sensibles
    program_enrolled     VARCHAR(100) NOT NULL,
    registration_date    DATE        NOT NULL,
    status               VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    -- ACTIVE, GRADUATED, WITHDRAWN, REFERRED
    case_worker_id       UUID        REFERENCES admin_user(id),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice sobre hash de identificación para búsqueda sin descifrar
-- El hash se calcula en Java antes de persistir
CREATE TABLE beneficiary_search_index (
    beneficiary_id       UUID        PRIMARY KEY REFERENCES beneficiary(id) ON DELETE CASCADE,
    identification_hash  VARCHAR(64) NOT NULL UNIQUE,  -- SHA-256 del número de identificación
    name_search_tokens   TEXT        -- Tokens normalizados para búsqueda (sin datos sensibles)
);

CREATE TABLE case_record (
    id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    beneficiary_id UUID        NOT NULL REFERENCES beneficiary(id),
    -- Notas cifradas (AES-256-GCM)
    notes_enc      BYTEA,
    status         VARCHAR(20) NOT NULL DEFAULT 'OPEN',  -- OPEN, IN_PROGRESS, CLOSED
    created_by     UUID        NOT NULL REFERENCES admin_user(id),
    updated_by     UUID        REFERENCES admin_user(id),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_case_record_beneficiary ON case_record(beneficiary_id);
CREATE INDEX idx_case_record_status      ON case_record(status);
