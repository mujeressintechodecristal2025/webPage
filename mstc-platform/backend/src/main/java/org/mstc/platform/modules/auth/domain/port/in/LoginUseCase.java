package org.mstc.platform.modules.auth.domain.port.in;

import org.mstc.platform.shared.security.UserRole;

/**
 * Puerto de entrada — caso de uso de login.
 */
public interface LoginUseCase {

    /**
     * Autentica un usuario y retorna un token JWT.
     *
     * @param command credenciales del usuario
     * @return resultado con token JWT y datos del usuario
     * @throws org.springframework.security.authentication.BadCredentialsException si las credenciales son inválidas
     * @throws org.springframework.security.authentication.LockedException si la cuenta está bloqueada
     */
    LoginResult login(LoginCommand command);

    record LoginCommand(String email, String password, UserRole role) {}

    record LoginResult(
        String token,
        String userId,
        String email,
        UserRole role,
        int expiresInHours
    ) {}
}
