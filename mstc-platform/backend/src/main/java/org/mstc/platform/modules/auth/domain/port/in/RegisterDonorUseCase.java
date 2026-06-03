package org.mstc.platform.modules.auth.domain.port.in;

import java.util.UUID;

/**
 * Puerto de entrada — registro de nuevo donante.
 */
public interface RegisterDonorUseCase {

    RegisterResult register(RegisterCommand command);

    record RegisterCommand(
        String fullName,
        String identificationType,
        String identificationNumber,
        String email,
        String phone,
        String password,
        boolean privacyConsent
    ) {}

    record RegisterResult(UUID donorId, String email) {}
}
