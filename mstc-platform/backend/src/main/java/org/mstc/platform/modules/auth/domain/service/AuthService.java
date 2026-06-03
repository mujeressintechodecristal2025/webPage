package org.mstc.platform.modules.auth.domain.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mstc.platform.modules.auth.domain.model.AdminUser;
import org.mstc.platform.modules.auth.domain.model.Donor;
import org.mstc.platform.modules.auth.domain.port.in.LoginUseCase;
import org.mstc.platform.modules.auth.domain.port.in.RegisterDonorUseCase;
import org.mstc.platform.modules.auth.domain.port.out.AdminUserRepository;
import org.mstc.platform.modules.auth.domain.port.out.AuthNotificationPort;
import org.mstc.platform.modules.auth.domain.port.out.DonorRepository;
import org.mstc.platform.shared.exception.BusinessConflictException;
import org.mstc.platform.shared.exception.BusinessRuleException;
import org.mstc.platform.shared.security.JwtService;
import org.mstc.platform.shared.security.UserRole;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

/**
 * Servicio de dominio de autenticación.
 *
 * Implementa:
 * - LoginUseCase (ADMIN y DONOR)
 * - RegisterDonorUseCase
 *
 * Mandatos de seguridad:
 * - BCrypt cost 12 (delegado a PasswordEncoder)
 * - Bloqueo tras 5 intentos fallidos por 15 minutos
 * - JWT RS256 (delegado a JwtService)
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements LoginUseCase, RegisterDonorUseCase {

    private static final int MAX_ATTEMPTS      = 5;
    private static final int LOCKOUT_MINUTES   = 15;

    private final AdminUserRepository   adminUserRepository;
    private final DonorRepository       donorRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;
    private final AuthNotificationPort  notificationPort;

    // ── Login ─────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public LoginResult login(LoginCommand command) {
        return switch (command.role()) {
            case ADMIN -> loginAdmin(command);
            case DONOR -> loginDonor(command);
        };
    }

    private LoginResult loginAdmin(LoginCommand command) {
        AdminUser user = adminUserRepository.findByEmail(command.email())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        if (user.isLocked()) {
            throw new LockedException("Cuenta bloqueada hasta " + user.getLockedUntil());
        }

        if (!passwordEncoder.matches(command.password(), user.getPasswordHash())) {
            handleFailedAttemptAdmin(user);
            throw new BadCredentialsException("Credenciales inválidas");
        }

        // Login exitoso — resetear intentos
        adminUserRepository.save(user.resetFailedAttempts());

        String token = jwtService.generateToken(
                user.getId().toString(), user.getEmail(), UserRole.ADMIN);

        return new LoginResult(token, user.getId().toString(),
                user.getEmail(), UserRole.ADMIN, 8);
    }

    private LoginResult loginDonor(LoginCommand command) {
        Donor donor = donorRepository.findByEmail(command.email())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        if (donor.isLocked()) {
            throw new LockedException("Cuenta bloqueada hasta " + donor.getLockedUntil());
        }

        if (!passwordEncoder.matches(command.password(), donor.getPasswordHash())) {
            handleFailedAttemptDonor(donor);
            throw new BadCredentialsException("Credenciales inválidas");
        }

        donorRepository.save(donor.resetFailedAttempts());

        String token = jwtService.generateToken(
                donor.getId().toString(), donor.getEmail(), UserRole.DONOR);

        return new LoginResult(token, donor.getId().toString(),
                donor.getEmail(), UserRole.DONOR, 24);
    }

    private void handleFailedAttemptAdmin(AdminUser user) {
        AdminUser updated;
        if (user.getFailedAttempts() + 1 >= MAX_ATTEMPTS) {
            updated = user.lockFor(LOCKOUT_MINUTES);
            log.warn("Cuenta ADMIN bloqueada: {}", user.getEmail());
            notificationPort.sendAccountLockedEmail(user.getEmail(), LOCKOUT_MINUTES);
        } else {
            updated = user.incrementFailedAttempts();
        }
        adminUserRepository.save(updated);
    }

    private void handleFailedAttemptDonor(Donor donor) {
        Donor updated;
        if (donor.getFailedAttempts() + 1 >= MAX_ATTEMPTS) {
            updated = donor.lockFor(LOCKOUT_MINUTES);
            log.warn("Cuenta DONOR bloqueada: {}", donor.getEmail());
            notificationPort.sendAccountLockedEmail(donor.getEmail(), LOCKOUT_MINUTES);
        } else {
            updated = donor.incrementFailedAttempts();
        }
        donorRepository.save(updated);
    }

    // ── Registro de donante ───────────────────────────────────────────────

    @Override
    @Transactional
    public RegisterResult register(RegisterCommand command) {
        if (!command.privacyConsent()) {
            throw new BusinessRuleException("privacy-consent-required",
                    "Debes aceptar la política de privacidad para registrarte");
        }

        if (donorRepository.existsByEmail(command.email())) {
            throw new BusinessConflictException(
                    "Ya existe una cuenta con el correo: " + command.email());
        }

        if (donorRepository.existsByIdentificationNumber(command.identificationNumber())) {
            throw new BusinessConflictException(
                    "Ya existe una cuenta con ese número de identificación");
        }

        Donor donor = Donor.builder()
                .id(UUID.randomUUID())
                .fullName(command.fullName())
                .identificationType(command.identificationType())
                .identificationNumber(command.identificationNumber())
                .email(command.email())
                .phone(command.phone())
                .emailVerified(false)
                .passwordHash(passwordEncoder.encode(command.password()))
                .failedAttempts(0)
                .privacyConsent(true)
                .consentDate(Instant.now())
                .active(true)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        Donor saved = donorRepository.save(donor);
        notificationPort.sendWelcomeEmail(saved.getEmail(), saved.getFullName());

        log.info("Nuevo donante registrado: {}", saved.getId());
        return new RegisterResult(saved.getId(), saved.getEmail());
    }
}
