package org.mstc.platform.modules.auth.domain.port.out;

/**
 * Puerto de salida — notificaciones del módulo de autenticación.
 */
public interface AuthNotificationPort {
    void sendWelcomeEmail(String email, String fullName);
    void sendAccountLockedEmail(String email, int lockoutMinutes);
    void sendPasswordResetEmail(String email, String resetToken);
}
