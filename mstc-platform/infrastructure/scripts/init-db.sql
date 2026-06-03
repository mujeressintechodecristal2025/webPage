-- ============================================================
-- Script de inicialización de base de datos MSTC
-- Ejecutado automáticamente por Docker al crear el contenedor
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Schema de auditoría
CREATE SCHEMA IF NOT EXISTS audit;

COMMENT ON DATABASE mstc_db IS 'Base de datos principal — Fundación MSTC';
