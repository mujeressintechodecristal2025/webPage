package org.mstc.platform.modules.notification.adapter.out.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mstc.platform.modules.auth.domain.port.out.AuthNotificationPort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * Adaptador de salida — envío de emails via SMTP / AWS SES.
 * Implementa todos los puertos de notificación del sistema.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationAdapter implements AuthNotificationPort {

    private final JavaMailSender mailSender;

    @Override
    public void sendWelcomeEmail(String email, String fullName) {
        send(email,
            "Bienvenida a la Fundación MSTC",
            "Hola " + fullName + ",\n\n" +
            "Tu cuenta ha sido creada exitosamente. " +
            "Gracias por unirte a nuestra comunidad de donantes.\n\n" +
            "Fundación Mujeres sin Techo de Cristal");
    }

    @Override
    public void sendAccountLockedEmail(String email, int lockoutMinutes) {
        send(email,
            "Cuenta bloqueada temporalmente — Fundación MSTC",
            "Tu cuenta ha sido bloqueada por " + lockoutMinutes +
            " minutos debido a múltiples intentos de acceso fallidos.\n\n" +
            "Si no fuiste tú, por favor contáctanos inmediatamente.\n\n" +
            "Fundación Mujeres sin Techo de Cristal");
    }

    @Override
    public void sendPasswordResetEmail(String email, String resetToken) {
        send(email,
            "Restablecer contraseña — Fundación MSTC",
            "Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n" +
            "https://www.fundacionmujeressintechodecristal.org/reset-password?token=" +
            resetToken + "\n\n" +
            "Este enlace expira en 1 hora.\n\n" +
            "Fundación Mujeres sin Techo de Cristal");
    }

    private void send(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("mujeressintechodecristal2025@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.debug("Email enviado a: {}", to);
        } catch (Exception e) {
            // No propagar — el email es best-effort, no debe romper el flujo principal
            log.error("Error al enviar email a {}: {}", to, e.getMessage());
        }
    }
}
