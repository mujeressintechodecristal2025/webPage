package org.mstc.platform.modules.auth.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.mstc.platform.modules.auth.domain.model.Donor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "donor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "identification_type", nullable = false, length = 20)
    private String identificationType;

    @Column(name = "identification_number", nullable = false, unique = true, length = 50)
    private String identificationNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "failed_attempts", nullable = false)
    private int failedAttempts;

    @Column(name = "locked_until")
    private Instant lockedUntil;

    @Column(name = "privacy_consent", nullable = false)
    private boolean privacyConsent;

    @Column(name = "consent_date")
    private Instant consentDate;

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

    public static DonorJpaEntity fromDomain(Donor domain) {
        return DonorJpaEntity.builder()
                .id(domain.getId())
                .fullName(domain.getFullName())
                .identificationType(domain.getIdentificationType())
                .identificationNumber(domain.getIdentificationNumber())
                .email(domain.getEmail())
                .phone(domain.getPhone())
                .emailVerified(domain.isEmailVerified())
                .passwordHash(domain.getPasswordHash())
                .failedAttempts(domain.getFailedAttempts())
                .lockedUntil(domain.getLockedUntil())
                .privacyConsent(domain.isPrivacyConsent())
                .consentDate(domain.getConsentDate())
                .active(domain.isActive())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public Donor toDomain() {
        return Donor.builder()
                .id(id)
                .fullName(fullName)
                .identificationType(identificationType)
                .identificationNumber(identificationNumber)
                .email(email)
                .phone(phone)
                .emailVerified(emailVerified)
                .passwordHash(passwordHash)
                .failedAttempts(failedAttempts)
                .lockedUntil(lockedUntil)
                .privacyConsent(privacyConsent)
                .consentDate(consentDate)
                .active(active)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }
}
