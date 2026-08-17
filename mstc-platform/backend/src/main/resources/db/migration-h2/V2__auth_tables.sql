CREATE TABLE admin_user (
    id              UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    username        VARCHAR(50)  NOT NULL UNIQUE,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    totp_enabled    BOOLEAN      NOT NULL DEFAULT FALSE,
    totp_secret     VARCHAR(255),
    failed_attempts INT          NOT NULL DEFAULT 0,
    locked_until    TIMESTAMP,
    active          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE donor (
    id                    UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    full_name             VARCHAR(255) NOT NULL,
    identification_type   VARCHAR(20)  NOT NULL,
    identification_number VARCHAR(50)  NOT NULL UNIQUE,
    email                 VARCHAR(255) NOT NULL UNIQUE,
    phone                 VARCHAR(20),
    email_verified        BOOLEAN      NOT NULL DEFAULT FALSE,
    password_hash         VARCHAR(255) NOT NULL,
    failed_attempts       INT          NOT NULL DEFAULT 0,
    locked_until          TIMESTAMP,
    privacy_consent       BOOLEAN      NOT NULL DEFAULT FALSE,
    consent_date          TIMESTAMP,
    active                BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at            TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_donor_email          ON donor(email);
CREATE INDEX idx_donor_identification ON donor(identification_number);
