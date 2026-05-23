package org.mstc.platform.shared.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Filtro JWT que extrae y valida el token Bearer en cada request.
 * Se ejecuta una sola vez por request (OncePerRequestFilter).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            JwtService.JwtClaims claims = jwtService.validateAndExtract(token);

            UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                    claims.userId(),
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_" + claims.role().name()))
                );

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (JwtService.JwtValidationException e) {
            log.debug("Token JWT inválido: {}", e.getMessage());
            // No lanzar excepción — dejar que Spring Security maneje el 401
        }

        filterChain.doFilter(request, response);
    }
}
