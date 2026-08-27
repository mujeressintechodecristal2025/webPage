CREATE TABLE donation_record (
    id                     UUID        DEFAULT RANDOM_UUID() PRIMARY KEY,
    donor_id               UUID        REFERENCES donor(id),
    amount_cop             BIGINT      NOT NULL CHECK (amount_cop >= 1000),
    payment_method         VARCHAR(20) NOT NULL,
    gateway_transaction_id VARCHAR(255),
    status                 VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    campaign_id            VARCHAR(100),
    initiated_at           TIMESTAMP   NOT NULL DEFAULT NOW(),
    confirmed_at           TIMESTAMP,
    failed_at              TIMESTAMP,
    failure_reason         CLOB
);

CREATE INDEX idx_donation_donor   ON donation_record(donor_id);
CREATE INDEX idx_donation_status  ON donation_record(status);
CREATE INDEX idx_donation_gateway ON donation_record(gateway_transaction_id);

CREATE TABLE payment_webhook_log (
    id            UUID        DEFAULT RANDOM_UUID() PRIMARY KEY,
    donation_id   UUID        REFERENCES donation_record(id),
    gateway       VARCHAR(20) NOT NULL,
    raw_payload   CLOB        NOT NULL,
    hmac_verified BOOLEAN     NOT NULL DEFAULT FALSE,
    processed     BOOLEAN     NOT NULL DEFAULT FALSE,
    received_at   TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE donation_certificate (
    id                 UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    donation_record_id UUID         NOT NULL REFERENCES donation_record(id),
    certificate_number VARCHAR(50)  NOT NULL UNIQUE,
    s3_key             VARCHAR(500) NOT NULL,
    generated_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
    download_count     INT          NOT NULL DEFAULT 0
);

CREATE SEQUENCE certificate_seq START WITH 1 INCREMENT BY 1;
