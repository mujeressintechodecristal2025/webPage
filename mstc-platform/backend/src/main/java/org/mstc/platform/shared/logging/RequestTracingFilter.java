package org.mstc.platform.shared.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

/**
 * Filtro que inyecta campos de contexto (MDC) en cada request HTTP.
 * Estos campos aparecen automáticamente en los logs JSON de producción,
 * permitiendo correlación y búsqueda en CloudWatch Logs Insights.
 *
 * Campos MDC inyectados:
 * - requestId:   UUID único por request (correlación end-to-end)
 * - traceId:     heredado del header X-Trace-Id si viene del front/gateway, o nuevo UUID
 * - clientIp:    IP real del cliente (soporta X-Forwarded-For de Nginx)
 * - httpMethod:  GET, POST, PUT, DELETE, etc.
 * - requestPath: path del request (sin query string)
 * - userId:      ID del usuario autenticado (si aplica, post-JWT filter)
 *
 * Se ejecuta ANTES del JwtAuthenticationFilter para que todos los logs
 * de autenticación ya tengan el requestId.
 */
@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class RequestTracingFilter extends OncePerRequestFilter {

    private static final String MDC_REQUEST_ID   = "requestId";
    private static final String MDC_TRACE_ID     = "traceId";
    private static final String MDC_CLIENT_IP    = "clientIp";
    private static final String MDC_HTTP_METHOD  = "httpMethod";
    private static final String MDC_REQUEST_PATH = "requestPath";
    private static final String MDC_USER_ID      = "userId";

    private static final String HEADER_X_TRACE_ID      = "X-Trace-Id";
    private static final String HEADER_X_FORWARDED_FOR = "X-Forwarded-For";

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        long startTime = System.currentTimeMillis();

        try {
            // Generar/heredar IDs de correlación
            String requestId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
            String traceId = resolveTraceId(request);
            String clientIp = resolveClientIp(request);

            // Poblar MDC
            MDC.put(MDC_REQUEST_ID, requestId);
            MDC.put(MDC_TRACE_ID, traceId);
            MDC.put(MDC_CLIENT_IP, clientIp);
            MDC.put(MDC_HTTP_METHOD, request.getMethod());
            MDC.put(MDC_REQUEST_PATH, request.getRequestURI());

            // Propagar requestId en el response header (útil para debugging en frontend)
            response.setHeader("X-Request-Id", requestId);

            // Ejecutar el resto de la cadena de filtros
            filterChain.doFilter(request, response);

            // Post-filter: intentar poblar userId si fue autenticado
            populateUserId();

        } finally {
            long duration = System.currentTimeMillis() - startTime;

            // Log de acceso (INFO para requests exitosos, WARN para 4xx/5xx)
            int status = response.getStatus();
            if (status >= 500) {
                log.error("HTTP {} {} → {} ({}ms)", request.getMethod(), request.getRequestURI(), status, duration);
            } else if (status >= 400) {
                log.warn("HTTP {} {} → {} ({}ms)", request.getMethod(), request.getRequestURI(), status, duration);
            } else if (log.isDebugEnabled()) {
                log.debug("HTTP {} {} → {} ({}ms)", request.getMethod(), request.getRequestURI(), status, duration);
            }

            // Limpiar MDC para evitar leaks entre requests (thread pool)
            MDC.clear();
        }
    }

    /**
     * Resuelve el traceId: si el frontend/gateway envía X-Trace-Id lo reutiliza,
     * si no, genera uno nuevo.
     */
    private String resolveTraceId(HttpServletRequest request) {
        String headerTrace = request.getHeader(HEADER_X_TRACE_ID);
        if (headerTrace != null && !headerTrace.isBlank() && headerTrace.length() <= 64) {
            return headerTrace.trim();
        }
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * Resuelve la IP real del cliente considerando el proxy Nginx (X-Forwarded-For).
     */
    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader(HEADER_X_FORWARDED_FOR);
        if (forwarded != null && !forwarded.isBlank()) {
            // X-Forwarded-For puede ser "client, proxy1, proxy2" — tomar el primero
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    /**
     * Intenta poblar el userId desde el SecurityContext (post-autenticación).
     */
    private void populateUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            MDC.put(MDC_USER_ID, auth.getName());
        }
    }

    /**
     * No filtrar requests a actuator/health para reducir ruido en logs.
     */
    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/actuator/");
    }
}
