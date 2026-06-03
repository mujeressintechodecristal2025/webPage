package org.mstc.platform.modules.auth.adapter.in.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.auth.domain.port.in.LoginUseCase;
import org.mstc.platform.modules.auth.domain.port.in.RegisterDonorUseCase;
import org.mstc.platform.shared.security.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginUseCase        loginUseCase;
    private final RegisterDonorUseCase registerDonorUseCase;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginUseCase.LoginResult result = loginUseCase.login(
                new LoginUseCase.LoginCommand(request.email(), request.password(), request.role()));
        return ResponseEntity.ok(new LoginResponse(
                result.token(), result.userId(), result.email(),
                result.role(), result.expiresInHours()));
    }

    @PostMapping("/register/donor")
    public ResponseEntity<RegisterResponse> registerDonor(
            @Valid @RequestBody RegisterDonorRequest request) {
        RegisterDonorUseCase.RegisterResult result = registerDonorUseCase.register(
                new RegisterDonorUseCase.RegisterCommand(
                        request.fullName(), request.identificationType(),
                        request.identificationNumber(), request.email(),
                        request.phone(), request.password(), request.privacyConsent()));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new RegisterResponse(result.donorId().toString(), result.email()));
    }

    // ── DTOs ──────────────────────────────────────────────────────────────

    record LoginRequest(
            @jakarta.validation.constraints.Email
            @jakarta.validation.constraints.NotBlank String email,
            @jakarta.validation.constraints.NotBlank String password,
            UserRole role
    ) {}

    record LoginResponse(
            String token, String userId, String email,
            UserRole role, int expiresInHours) {}

    record RegisterDonorRequest(
            @jakarta.validation.constraints.NotBlank String fullName,
            @jakarta.validation.constraints.NotBlank String identificationType,
            @jakarta.validation.constraints.NotBlank String identificationNumber,
            @jakarta.validation.constraints.Email
            @jakarta.validation.constraints.NotBlank String email,
            String phone,
            @jakarta.validation.constraints.Size(min = 8) String password,
            boolean privacyConsent
    ) {}

    record RegisterResponse(String donorId, String email) {}
}
