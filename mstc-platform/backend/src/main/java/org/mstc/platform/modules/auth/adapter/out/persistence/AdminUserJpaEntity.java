package org.mstc.platform.modules.auth.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.mstc.platform.modules.auth.domain.model.AdminUser;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "admin_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "totp_enabled", nullable = false)
    private boolean totpEnabled;

    @Column(name = "totp_secret")
    private String totpSecret;

    @Column(name = "failed_attempts", nullable = false)
    private int failedAttempts;

    @Column(name = "locked_until")
    private Instant lockedUntil;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Instant.now();
    }

    // ── Mapeo dominio ↔ JPA ───────────────────────────────────────────────

    public static AdminUserJpaEntity fromDomain(AdminUser domain) {
        return AdminUserJpaEntity.builder()
                .id(domain.getId())
                .username(domain.getUsername())
                .email(domain.getEmail())
                .passwordHash(domain.getPasswordHash())
                .totpEnabled(domain.isTotpEnabled())
                .totpSecret(domain.getTotpSecret())
                .failedAttempts(domain.getFailedAttempts())
                .lockedUntil(domain.getLockedUntil())
                .active(domain.isActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public AdminUser toDomain() {
        return AdminUser.builder()
                .id(id)
                .username(username)
                .email(email)
                .passwordHash(passwordHash)
                .totpEnabled(totpEnabled)
                .totpSecret(totpSecret)
                .failedAttempts(failedAttempts)
                .lockedUntil(lockedUntil)
                .active(active)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }
}
