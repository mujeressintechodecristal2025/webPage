-- ============================================================
-- V5 — Tablas de donaciones (DonationModule + DonorPortalModule)
-- ============================================================

CREATE TABLE donation_record (
    id                     UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id               UUID        REFERENCES donor(id),
    amount_cop             BIGINT      NOT NULL CHECK (amount_cop >= 1000),
    payment_method         VARCHAR(20) NOT NULL,   -- NEQUI, DAVIPLATA, PSE
    gateway_transaction_id VARCHAR(255),
    status                 VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    -- PENDING, CONFIRMED, FAILED, REFUNDED
    campaign_id            VARCHAR(100),
    initiated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at           TIMESTAMPTZ,
    failed_at              TIMESTAMPTZ,
    failure_reason         TEXT
);

CREATE INDEX idx_donation_donor    ON donation_record(donor_id);
CREATE INDEX idx_donation_status   ON donation_record(status);
CREATE INDEX idx_donation_gateway  ON donation_record(gateway_transaction_id);

CREATE TABLE payment_webhook_log (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_id     UUID        REFERENCES donation_record(id),
    gateway         VARCHAR(20) NOT NULL,
    raw_payload     TEXT        NOT NULL,
    hmac_verified   BOOLEAN     NOT NULL DEFAULT FALSE,
    processed       BOOLEAN     NOT NULL DEFAULT FALSE,
    received_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE donation_certificate (
    id                 UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_record_id UUID        NOT NULL REFERENCES donation_record(id),
    certificate_number VARCHAR(50) NOT NULL UNIQUE,  -- MSTC-2025-000001
    s3_key             VARCHAR(500) NOT NULL,
    generated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    download_count     INT         NOT NULL DEFAULT 0
);

-- Secuencia para numeración de certificados
CREATE SEQUENCE certificate_seq START 1 INCREMENT 1;
