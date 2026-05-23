import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    java
    id("org.springframework.boot")          version "3.3.2"
    id("io.spring.dependency-management")   version "1.1.6"
}

group   = "org.mstc"
version = "1.0.0-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

// ── Versiones de dependencias ──────────────────────────────────────────────
val mapstructVersion      = "1.6.0"
val lombokVersion         = "1.18.34"
val nimbusJoseVersion     = "9.40"
val bouncyCastleVersion   = "1.78.1"
val itextVersion          = "7.2.6"
val resilience4jVersion   = "2.2.0"
val jqwikVersion          = "1.8.5"
val testcontainersVersion = "1.20.1"
val awsSdkVersion         = "2.26.27"
val flywayVersion         = "10.15.2"

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {

    // ── Spring Boot Core ───────────────────────────────────────────────────
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-cache")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")

    // ── Redis ──────────────────────────────────────────────────────────────
    implementation("org.springframework.boot:spring-boot-starter-data-redis")

    // ── Base de Datos ──────────────────────────────────────────────────────
    runtimeOnly("org.postgresql:postgresql")
    implementation("org.flywaydb:flyway-core:$flywayVersion")
    implementation("org.flywaydb:flyway-database-postgresql:$flywayVersion")

    // ── JWT RS256 — Nimbus JOSE ────────────────────────────────────────────
    implementation("com.nimbusds:nimbus-jose-jwt:$nimbusJoseVersion")

    // ── Cifrado AES-256-GCM — Bouncy Castle ───────────────────────────────
    implementation("org.bouncycastle:bcprov-jdk18on:$bouncyCastleVersion")

    // ── Generación de PDF — iText 7 ───────────────────────────────────────
    implementation("com.itextpdf:kernel:$itextVersion")
    implementation("com.itextpdf:layout:$itextVersion")
    implementation("com.itextpdf:io:$itextVersion")

    // ── AWS SDK v2 / MinIO (S3-compatible) ────────────────────────────────
    implementation("software.amazon.awssdk:s3:$awsSdkVersion")
    implementation("software.amazon.awssdk:sts:$awsSdkVersion")

    // ── Resilience4j — Circuit Breaker / Retry ────────────────────────────
    implementation("io.github.resilience4j:resilience4j-spring-boot3:$resilience4jVersion")

    // ── MapStruct — Mapeo de objetos ──────────────────────────────────────
    implementation("org.mapstruct:mapstruct:$mapstructVersion")
    annotationProcessor("org.mapstruct:mapstruct-processor:$mapstructVersion")

    // ── Lombok ────────────────────────────────────────────────────────────
    compileOnly("org.projectlombok:lombok:$lombokVersion")
    annotationProcessor("org.projectlombok:lombok:$lombokVersion")
    // Lombok + MapStruct juntos requieren este orden en annotationProcessor
    annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")

    // ── Testing ───────────────────────────────────────────────────────────
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")

    // jqwik — Property-Based Testing (obligatorio)
    testImplementation("net.jqwik:jqwik:$jqwikVersion")
    testImplementation("net.jqwik:jqwik-spring:$jqwikVersion")

    // Testcontainers — PostgreSQL y Redis reales en tests de integración
    testImplementation("org.testcontainers:junit-jupiter:$testcontainersVersion")
    testImplementation("org.testcontainers:postgresql:$testcontainersVersion")
    testImplementation("org.testcontainers:localstack:$testcontainersVersion")

    // Lombok en tests
    testCompileOnly("org.projectlombok:lombok:$lombokVersion")
    testAnnotationProcessor("org.projectlombok:lombok:$lombokVersion")
}

tasks.withType<Test> {
    useJUnitPlatform {
        // Incluir tanto JUnit 5 como jqwik
        includeEngines("junit-jupiter", "jqwik")
    }
    // Mostrar resultados de tests en consola
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = false
    }
}

tasks.withType<JavaCompile> {
    options.compilerArgs.addAll(listOf(
        // MapStruct usa Spring como modelo de componentes
        "-Amapstruct.defaultComponentModel=spring",
        // Lombok + MapStruct: Lombok primero
        "-Amapstruct.suppressGeneratorTimestamp=true"
    ))
}
