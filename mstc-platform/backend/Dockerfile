# ══════════════════════════════════════════════════════════════════════════════
# Dockerfile — MSTC Platform Backend
# Multi-stage build: compila con JDK 21, ejecuta con JRE 21 (imagen mínima)
# ══════════════════════════════════════════════════════════════════════════════

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /app

# Copiar archivos de Gradle primero (cachear dependencias)
COPY gradle/ gradle/
COPY gradlew gradlew.bat build.gradle.kts settings.gradle.kts ./

# Descargar dependencias (se cachea si build.gradle.kts no cambia)
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true

# Copiar código fuente
COPY src/ src/

# Compilar JAR (sin tests — los tests corren en un step separado del CI)
RUN ./gradlew bootJar -x test --no-daemon

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-jammy

# Metadatos
LABEL maintainer="Fundación Mujeres Sin Techo de Cristal"
LABEL description="MSTC Platform Backend - Spring Boot 3.3"

# Crear usuario no-root para seguridad
RUN groupadd -r mstc && useradd -r -g mstc -d /app mstc

WORKDIR /app

# Copiar JAR desde el builder
COPY --from=builder /app/build/libs/*.jar app.jar

# Crear directorios necesarios
RUN mkdir -p /app/keys /app/logs && chown -R mstc:mstc /app

# Puerto del backend
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -sf http://localhost:8080/actuator/health/liveness || exit 1

# Ejecutar como usuario no-root
USER mstc

# Configuración de JVM optimizada para t2.micro (1GB RAM)
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
