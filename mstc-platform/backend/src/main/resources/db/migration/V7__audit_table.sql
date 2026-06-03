-- ============================================================
-- V7 — Tabla de auditoría global
-- ============================================================

CREATE TABLE audit_log (
    id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id       UUID,
    actor_type     VARCHAR(20) NOT NULL,   -- ADMIN, DONOR, SYSTEM
    action         VARCHAR(50) NOT NULL,   -- CREATE, UPDATE, DELETE, LOGIN, etc.
    entity_type    VARCHAR(50) NOT NULL,   -- ContentItem, Beneficiary, etc.
    entity_id      UUID,
    change_summary JSONB,
    ip_address     VARCHAR(45),
    occurred_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_actor      ON audit_log(actor_id, actor_type);
CREATE INDEX idx_audit_entity     ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_occurred   ON audit_log(occurred_at DESC);
