-- ============================================================
-- V9 — Cambiar blog_post.tags de TEXT[] a TEXT (CSV)
-- El StringListConverter de la entidad JPA almacena los tags
-- como cadena separada por comas, no como array nativo.
-- Esta migración alinea el schema con el converter.
-- Idempotente: solo actúa si la columna sigue siendo array.
-- ============================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'blog_post'
          AND column_name = 'tags'
          AND data_type = 'ARRAY'
    ) THEN
        ALTER TABLE blog_post
            ALTER COLUMN tags TYPE TEXT
            USING array_to_string(tags, ',');
    END IF;
END $$;
