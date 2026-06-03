package org.mstc.platform.shared.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Manejador global de excepciones.
 * Todos los errores retornan RFC 7807 Problem Details.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String BASE_TYPE = "https://api.fundacionmujeressintechodecristal.org/errors/";

    // ── Validación de campos (@Valid) ─────────────────────────────────────
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidation(
            MethodArgumentNotValidException ex, HttpServletRequest req) {

        Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fe -> fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "Valor inválido",
                        (a, b) -> a
                ));

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);
        problem.setType(URI.create(BASE_TYPE + "validation-error"));
        problem.setTitle("Error de validación");
        problem.setDetail("Uno o más campos contienen valores inválidos");
        problem.setInstance(URI.create(req.getRequestURI()));
        problem.setProperty("fieldErrors", fieldErrors);
        return ResponseEntity.unprocessableEntity().body(problem);
    }

    // ── Violaciones de restricciones ──────────────────────────────────────
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ProblemDetail> handleConstraintViolation(
            ConstraintViolationException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);
        problem.setType(URI.create(BASE_TYPE + "constraint-violation"));
        problem.setTitle("Restricción violada");
        problem.setDetail(ex.getMessage());
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.unprocessableEntity().body(problem);
    }

    // ── Recurso no encontrado ─────────────────────────────────────────────
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleNotFound(
            ResourceNotFoundException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problem.setType(URI.create(BASE_TYPE + "not-found"));
        problem.setTitle("Recurso no encontrado");
        problem.setDetail(ex.getMessage());
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problem);
    }

    // ── Conflicto de negocio (ej. cédula duplicada) ───────────────────────
    @ExceptionHandler(BusinessConflictException.class)
    public ResponseEntity<ProblemDetail> handleConflict(
            BusinessConflictException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.CONFLICT);
        problem.setType(URI.create(BASE_TYPE + "conflict"));
        problem.setTitle("Conflicto de datos");
        problem.setDetail(ex.getMessage());
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(problem);
    }

    // ── Regla de negocio violada (ej. monto < 1000 COP) ──────────────────
    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<ProblemDetail> handleBusinessRule(
            BusinessRuleException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);
        problem.setType(URI.create(BASE_TYPE + ex.getErrorCode()));
        problem.setTitle("Regla de negocio violada");
        problem.setDetail(ex.getMessage());
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.unprocessableEntity().body(problem);
    }

    // ── Credenciales inválidas ────────────────────────────────────────────
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ProblemDetail> handleBadCredentials(
            BadCredentialsException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        problem.setType(URI.create(BASE_TYPE + "invalid-credentials"));
        problem.setTitle("Credenciales inválidas");
        problem.setDetail("Usuario o contraseña incorrectos");
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(problem);
    }

    // ── Cuenta bloqueada ──────────────────────────────────────────────────
    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ProblemDetail> handleLocked(
            LockedException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        problem.setType(URI.create(BASE_TYPE + "account-locked"));
        problem.setTitle("Cuenta bloqueada");
        problem.setDetail("La cuenta está bloqueada por 15 minutos debido a múltiples intentos fallidos");
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(problem);
    }

    // ── Acceso denegado ───────────────────────────────────────────────────
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ProblemDetail> handleAccessDenied(
            AccessDeniedException ex, HttpServletRequest req) {

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.FORBIDDEN);
        problem.setType(URI.create(BASE_TYPE + "forbidden"));
        problem.setTitle("Acceso denegado");
        problem.setDetail("No tienes permisos para acceder a este recurso");
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(problem);
    }

    // ── Error interno ─────────────────────────────────────────────────────
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleGeneral(
            Exception ex, HttpServletRequest req) {

        log.error("Error no controlado en {}: {}", req.getRequestURI(), ex.getMessage(), ex);

        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problem.setType(URI.create(BASE_TYPE + "internal-error"));
        problem.setTitle("Error interno del servidor");
        problem.setDetail("Ocurrió un error inesperado. Por favor intenta de nuevo.");
        problem.setInstance(URI.create(req.getRequestURI()));
        return ResponseEntity.internalServerError().body(problem);
    }
}
