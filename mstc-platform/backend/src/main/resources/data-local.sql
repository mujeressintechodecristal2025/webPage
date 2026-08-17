-- ============================================================
-- Seed de datos locales (perfil local, H2 en memoria)
-- Spring Boot ejecuta este archivo automáticamente
-- cuando spring.sql.init.mode=always
--
-- Credenciales admin: admin@fundacion.local / Admin1234!
-- ============================================================

INSERT INTO admin_user (id, username, email, password_hash, totp_enabled, failed_attempts, active, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin',
    'admin@fundacion.local',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCH6C0p4s9HZWvq5vJP/Upe',
    false, 0, true, NOW(), NOW()
);

INSERT INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, published_at, created_at, updated_at)
VALUES (
    '10000000-0000-0000-0000-000000000001',
    'primer-taller-modisteria-2026',
    'Primer taller de modistería del año',
    'Arrancamos el 2026 con el primer taller de modistería para nuestras beneficiarias.',
    '<h2>Un nuevo comienzo</h2><p>El pasado 15 de enero iniciamos el primer taller con 12 mujeres beneficiarias del programa <strong>Mujer Emprende</strong>.</p><ul><li>Manejo de máquina industrial</li><li>Lectura de patrones</li><li>Técnicas de corte</li></ul>',
    'Talleres',
    'taller,modisteria,mujeres,emprendimiento',
    'PUBLISHED',
    'Fundación MSTC',
    '00000000-0000-0000-0000-000000000001',
    NOW(),
    NOW(),
    NOW()
);

INSERT INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, published_at, created_at, updated_at)
VALUES (
    '10000000-0000-0000-0000-000000000002',
    'impacto-2025-resultados',
    '2025: Un año de transformación',
    'Cerramos el 2025 con más de 50 mujeres beneficiadas.',
    '<h2>Resumen de impacto 2025</h2><p>El año 2025 marcó un hito. Logramos impactar directamente a <strong>52 mujeres</strong>.</p>',
    'Noticias',
    'impacto,2025,resultados',
    'PUBLISHED',
    'Fundación MSTC',
    '00000000-0000-0000-0000-000000000001',
    NOW(),
    NOW(),
    NOW()
);

INSERT INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, created_at, updated_at)
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
    NOW(),
    NOW()
);
