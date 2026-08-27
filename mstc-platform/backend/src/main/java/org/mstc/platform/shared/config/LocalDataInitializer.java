package org.mstc.platform.shared.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Inserta datos iniciales para el perfil local (H2 en memoria).
 * Se ejecuta DESPUÉS de que Hibernate crea el schema.
 *
 * Credenciales admin: admin@fundacion.local / Admin1234!
 */
@Slf4j
@Configuration
@Profile("local")
@RequiredArgsConstructor
public class LocalDataInitializer {

    private final JdbcTemplate jdbc;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedLocalData() {
        return args -> {
            log.info("═══════════════════════════════════════════════════════════");
            log.info("  PERFIL LOCAL — Insertando datos de prueba en H2");
            log.info("═══════════════════════════════════════════════════════════");

            String hashedPassword = passwordEncoder.encode("Admin1234!");

            // Admin user — password: Admin1234!
            jdbc.update("""
                MERGE INTO admin_user (id, username, email, password_hash, totp_enabled, failed_attempts, active, created_at, updated_at)
                KEY(id)
                VALUES (
                    '00000000-0000-0000-0000-000000000001',
                    'admin',
                    'admin@fundacion.local',
                    ?,
                    false, 0, true, NOW(), NOW()
                )
            """, hashedPassword);

            // Blog posts de ejemplo
            jdbc.execute("""
                MERGE INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, published_at, created_at, updated_at)
                KEY(id)
                VALUES (
                    '10000000-0000-0000-0000-000000000001',
                    'primer-taller-modisteria-2026',
                    'Primer taller de modistería del año',
                    'Arrancamos el 2026 con el primer taller para nuestras beneficiarias.',
                    '<h2>Un nuevo comienzo</h2><p>El pasado 15 de enero iniciamos con 12 mujeres del programa <strong>Mujer Emprende</strong>.</p><ul><li>Manejo de máquina industrial</li><li>Lectura de patrones</li><li>Técnicas de corte</li></ul>',
                    'Talleres',
                    'taller,modisteria,mujeres',
                    'PUBLISHED',
                    'Fundación MSTC',
                    '00000000-0000-0000-0000-000000000001',
                    NOW(), NOW(), NOW()
                )
            """);

            jdbc.execute("""
                MERGE INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, published_at, created_at, updated_at)
                KEY(id)
                VALUES (
                    '10000000-0000-0000-0000-000000000002',
                    'impacto-2025-resultados',
                    '2025: Un año de transformación',
                    'Cerramos el 2025 con más de 50 mujeres beneficiadas.',
                    '<h2>Resumen de impacto</h2><p>Logramos impactar a <strong>52 mujeres</strong> en situación de vulnerabilidad.</p>',
                    'Noticias',
                    'impacto,2025,resultados',
                    'PUBLISHED',
                    'Fundación MSTC',
                    '00000000-0000-0000-0000-000000000001',
                    NOW(), NOW(), NOW()
                )
            """);

            jdbc.execute("""
                MERGE INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, created_at, updated_at)
                KEY(id)
                VALUES (
                    '10000000-0000-0000-0000-000000000003',
                    'proximo-taller-liderazgo',
                    'Próximo taller de liderazgo femenino',
                    'Estamos preparando un nuevo taller para marzo.',
                    '<p>Pronto anunciaremos los detalles...</p>',
                    'Eventos',
                    'liderazgo,taller',
                    'DRAFT',
                    'Fundación MSTC',
                    '00000000-0000-0000-0000-000000000001',
                    NOW(), NOW()
                )
            """);

            int admins = jdbc.queryForObject("SELECT COUNT(*) FROM admin_user", Integer.class);
            int posts  = jdbc.queryForObject("SELECT COUNT(*) FROM blog_post", Integer.class);

            log.info("  ✓ Admin users: {}", admins);
            log.info("  ✓ Blog posts:  {} (PUBLISHED + DRAFT)", posts);
            log.info("  ");
            log.info("  Credenciales: admin@fundacion.local / Admin1234!");
            log.info("  Frontend:     http://localhost:3000");
            log.info("  Backend API:  http://localhost:8080/api/v1");
            log.info("  H2 Console:   http://localhost:8080/h2-console");
            log.info("═══════════════════════════════════════════════════════════");
        };
    }
}
