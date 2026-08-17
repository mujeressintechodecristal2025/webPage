CREATE TABLE audit_log (
    id             UUID        DEFAULT RANDOM_UUID() PRIMARY KEY,
    actor_id       UUID,
    actor_type     VARCHAR(20) NOT NULL,
    action         VARCHAR(50) NOT NULL,
    entity_type    VARCHAR(50) NOT NULL,
    entity_id      UUID,
    change_summary CLOB,
    ip_address     VARCHAR(45),
    occurred_at    TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_actor    ON audit_log(actor_id, actor_type);
CREATE INDEX idx_audit_entity   ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_occurred ON audit_log(occurred_at DESC);
