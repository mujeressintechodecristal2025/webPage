package org.mstc.platform.shared.config;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.shared.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuración central de Spring Security.
 *
 * Mandatos de seguridad implementados:
 * - BCrypt cost factor 12
 * - JWT stateless (sin sesiones HTTP)
 * - Headers de seguridad HTTP
 * - CORS configurado para el dominio de la fundación
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Sin CSRF — API stateless con JWT
            .csrf(AbstractHttpConfigurer::disable)

            // CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Sesiones stateless — Redis gestiona el estado
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Headers de seguridad HTTP
            .headers(headers -> headers
                .frameOptions(frame -> frame.deny())
                .contentTypeOptions(ct -> {})
                .httpStrictTransportSecurity(hsts -> hsts
                    .maxAgeInSeconds(31536000)
                    .includeSubDomains(true))
            )

            // Reglas de autorización
            .authorizeHttpRequests(auth -> auth

                // ── Endpoints públicos (sin autenticación) ──────────────
                .requestMatchers(HttpMethod.GET,
                    "/api/v1/content/**",
                    "/api/v1/projects/**",
                    "/api/v1/blog/**",
                    "/api/v1/rte/**",
                    "/api/v1/donations/campaign/total",
                    "/api/v1/health",
                    "/api/v1/privacy-policy"
                ).permitAll()

                // Autenticación
                .requestMatchers("/api/v1/auth/**").permitAll()

                // Registro de donantes
                .requestMatchers(HttpMethod.POST, "/api/v1/donors/register").permitAll()

                // Webhooks de pago (verificación HMAC interna)
                .requestMatchers("/api/v1/donations/webhook/**").permitAll()

                // Actuator health (público)
                .requestMatchers("/actuator/health/**").permitAll()

                // Imágenes servidas localmente (perfil local)
                .requestMatchers("/uploads/**").permitAll()

                // ── Endpoints de donantes ───────────────────────────────
                .requestMatchers("/api/v1/donors/**").hasRole("DONOR")

                // ── Endpoints administrativos ───────────────────────────
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                // Todo lo demás requiere autenticación
                .anyRequest().authenticated()
            )

            // Filtro JWT antes del filtro de autenticación estándar
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * BCrypt con cost factor 12 — mandato de seguridad.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
            "https://www.fundacionmujeressintechodecristal.org",
            "https://fundacionmujeressintechodecristal.org",
            "http://localhost:3000"   // Desarrollo local
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
