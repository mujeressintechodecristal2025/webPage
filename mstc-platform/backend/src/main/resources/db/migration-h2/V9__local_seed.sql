-- ============================================================
-- V9 — Seed de datos locales (solo perfil local)
-- Contraseña del admin: Admin1234!
-- BCrypt $2a$12$ generado con strength=12
-- ============================================================

INSERT INTO admin_user (id, username, email, password_hash, totp_enabled, failed_attempts, active, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin',
    'admin@fundacion.local',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCH6C0p4s9HZWvq5vJP/Upe',
    FALSE, 0, TRUE, NOW(), NOW()
);

INSERT INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, published_at, created_at, updated_at)
VALUES (
    '10000000-0000-0000-0000-000000000001',
    'primer-taller-modisteria-2026',
    'Primer taller de modistería del año',
    'Arrancamos el 2026 con el primer taller de modistería para nuestras beneficiarias.',
    '<h2>Un nuevo comienzo</h2><p>El pasado 15 de enero iniciamos el primer taller de modistería del año con 12 mujeres beneficiarias del programa <strong>Mujer Emprende</strong>.</p><p>Durante 8 semanas aprenderán las técnicas de diseño, patronaje y confección que les permitirán emprender sus propios proyectos de moda.</p><h3>Lo que aprendieron</h3><ul><li>Manejo de máquina de coser industrial</li><li>Lectura de patrones básicos</li><li>Técnicas de corte y confección</li></ul>',
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
    'Cerramos el 2025 con más de 50 mujeres beneficiadas y 3 proyectos de emprendimiento activos.',
    '<h2>Resumen de impacto 2025</h2><p>El año 2025 marcó un hito para la Fundación Mujeres Sin Techo de Cristal. Logramos impactar directamente a <strong>52 mujeres</strong> en situación de vulnerabilidad.</p>',
    'Noticias',
    'impacto,2025,resultados,fundacion',
    'PUBLISHED',
    'Fundación MSTC',
    '00000000-0000-0000-0000-000000000001',
    DATEADD(DAY, -30, NOW()),
    DATEADD(DAY, -30, NOW()),
    DATEADD(DAY, -30, NOW())
);

INSERT INTO blog_post (id, slug, title, excerpt, body, category, tags, status, author_name, author_id, created_at, updated_at)
VALUES (
    '10000000-0000-0000-0000-000000000003',
    'proximo-taller-liderazgo',
    'Próximo taller de liderazgo femenino',
    'Estamos preparando un nuevo taller de liderazgo para el mes de marzo.',
    '<p>Pronto anunciaremos los detalles del próximo taller...</p>',
    'Eventos',
    'liderazgo,taller,proximo',
    'DRAFT',
    'Fundación MSTC',
    '00000000-0000-0000-0000-000000000001',
    NOW(),
    NOW()
);
