package org.mstc.platform.modules.auth.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.With;

import java.time.Instant;
import java.util.UUID;

/**
 * Entidad de dominio Donor — POJO puro.
 */
@Getter
@Builder
@With
public class Donor {

    private final UUID    id;
    private final String  fullName;
    private final String  identificationType;
    private final String  identificationNumber;
    private final String  email;
    private final String  phone;
    private final boolean emailVerified;
    private final String  passwordHash;
    private final int     failedAttempts;
    private final Instant lockedUntil;
    private final boolean privacyConsent;
    private final Instant consentDate;
    private final boolean active;
    private final Instant createdAt;
    private final Instant updatedAt;

    public boolean isLocked() {
        return lockedUntil != null && Instant.now().isBefore(lockedUntil);
    }

    public Donor incrementFailedAttempts() {
        return this.withFailedAttempts(this.failedAttempts + 1);
    }

    public Donor lockFor(int minutes) {
        return this.withLockedUntil(Instant.now().plusSeconds(minutes * 60L))
                   .withFailedAttempts(this.failedAttempts + 1);
    }

    public Donor resetFailedAttempts() {
        return this.withFailedAttempts(0).withLockedUntil(null);
    }
}
