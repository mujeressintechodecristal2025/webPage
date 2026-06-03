package org.mstc.platform.modules.auth.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.With;

import java.time.Instant;
import java.util.UUID;

/**
 * Entidad de dominio AdminUser — POJO puro, sin anotaciones JPA.
 * JPA vive en el adaptador de persistencia.
 */
@Getter
@Builder
@With
public class AdminUser {

    private final UUID    id;
    private final String  username;
    private final String  email;
    private final String  passwordHash;
    private final boolean totpEnabled;
    private final String  totpSecret;
    private final int     failedAttempts;
    private final Instant lockedUntil;
    private final boolean active;
    private final Instant createdAt;
    private final Instant updatedAt;

    /** Verifica si la cuenta está actualmente bloqueada. */
    public boolean isLocked() {
        return lockedUntil != null && Instant.now().isBefore(lockedUntil);
    }

    /** Incrementa el contador de intentos fallidos. */
    public AdminUser incrementFailedAttempts() {
        return this.withFailedAttempts(this.failedAttempts + 1);
    }

    /** Bloquea la cuenta por los minutos indicados. */
    public AdminUser lockFor(int minutes) {
        return this.withLockedUntil(Instant.now().plusSeconds(minutes * 60L))
                   .withFailedAttempts(this.failedAttempts + 1);
    }

    /** Resetea el contador de intentos fallidos tras login exitoso. */
    public AdminUser resetFailedAttempts() {
        return this.withFailedAttempts(0).withLockedUntil(null);
    }
}
