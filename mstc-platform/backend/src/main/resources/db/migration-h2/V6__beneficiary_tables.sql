CREATE TABLE beneficiary (
    id                 UUID         DEFAULT RANDOM_UUID() PRIMARY KEY,
    full_name_enc      BLOB         NOT NULL,
    identification_enc BLOB         NOT NULL,
    contact_info_enc   BLOB,
    program_enrolled   VARCHAR(100) NOT NULL,
    registration_date  DATE         NOT NULL,
    status             VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    case_worker_id     UUID         REFERENCES admin_user(id),
    created_at         TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE beneficiary_search_index (
    beneficiary_id      UUID        DEFAULT RANDOM_UUID() PRIMARY KEY REFERENCES beneficiary(id) ON DELETE CASCADE,
    identification_hash VARCHAR(64) NOT NULL UNIQUE,
    name_search_tokens  CLOB
);

CREATE TABLE case_record (
    id             UUID        DEFAULT RANDOM_UUID() PRIMARY KEY,
    beneficiary_id UUID        NOT NULL REFERENCES beneficiary(id),
    notes_enc      BLOB,
    status         VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_by     UUID        NOT NULL REFERENCES admin_user(id),
    updated_by     UUID        REFERENCES admin_user(id),
    created_at     TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_case_record_beneficiary ON case_record(beneficiary_id);
CREATE INDEX idx_case_record_status      ON case_record(status);
