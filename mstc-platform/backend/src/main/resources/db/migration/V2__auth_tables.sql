-- ============================================================
-- V2 — Tablas de autenticación (AuthModule)
-- ============================================================

CREATE TABLE admin_user (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    username        VARCHAR(50) NOT NULL UNIQUE,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    totp_enabled    BOOLEAN     NOT NULL DEFAULT FALSE,
    totp_secret     VARCHAR(255),
    failed_attempts INT         NOT NULL DEFAULT 0,
    locked_until    TIMESTAMPTZ,
    active          BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE donor (
    id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name           VARCHAR(255) NOT NULL,
    identification_type VARCHAR(20)  NOT NULL,   -- CC, CE, NIT, PASAPORTE
    identification_number VARCHAR(50) NOT NULL UNIQUE,
    email               VARCHAR(255) NOT NULL UNIQUE,
    phone               VARCHAR(20),
    email_verified      BOOLEAN     NOT NULL DEFAULT FALSE,
    password_hash       VARCHAR(255) NOT NULL,
    failed_attempts     INT         NOT NULL DEFAULT 0,
    locked_until        TIMESTAMPTZ,
    privacy_consent     BOOLEAN     NOT NULL DEFAULT FALSE,
    consent_date        TIMESTAMPTZ,
    active              BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_donor_email ON donor(email);
CREATE INDEX idx_donor_identification ON donor(identification_number);
