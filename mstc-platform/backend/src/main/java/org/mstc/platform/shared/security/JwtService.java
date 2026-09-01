package org.mstc.platform.shared.security;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jwt.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

/**
 * Servicio JWT con firma RS256.
 *
 * - ADMIN: expiración 8 horas
 * - DONOR: expiración 24 horas
 * - Clave RSA 2048 bits cargada desde PEM en disco
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties jwtProperties;

    private RSAKey rsaKey;

    @PostConstruct
    void init() throws Exception {
        // En dev se genera una clave efímera si no existe el archivo PEM
        // En prod la clave viene del filesystem (montada como secret en K8s/Railway)
        try {
            rsaKey = loadKeyFromPath(jwtProperties.privateKeyPath());
            log.info("Clave RSA JWT cargada desde: {}", jwtProperties.privateKeyPath());
        } catch (Exception e) {
            log.warn("No se encontró clave RSA en disco. Generando clave efímera para desarrollo.");
            rsaKey = new RSAKeyGenerator(2048)
                .keyID(UUID.randomUUID().toString())
                .generate();
        }
    }

    /**
     * Genera un token JWT firmado con RS256.
     */
    public String generateToken(String userId, String email, UserRole role) {
        try {
            int expirationHours = role == UserRole.ADMIN
                ? jwtProperties.expirationAdminHours()
                : jwtProperties.expirationDonorHours();

            Instant now    = Instant.now();
            Instant expiry = now.plusSeconds(expirationHours * 3600L);

            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject(userId)
                .claim("email", email)
                .claim("role", role.name())
                .issuer("https://api.fundacionmujeressintechodecristal.org")
                .issueTime(Date.from(now))
                .expirationTime(Date.from(expiry))
                .jwtID(UUID.randomUUID().toString())
                .build();

            SignedJWT signedJWT = new SignedJWT(
                new JWSHeader.Builder(JWSAlgorithm.RS256)
                    .keyID(rsaKey.getKeyID())
                    .build(),
                claims
            );

            signedJWT.sign(new RSASSASigner(rsaKey));
            return signedJWT.serialize();

        } catch (Exception e) {
            throw new RuntimeException("Error al generar token JWT", e);
        }
    }

    /**
     * Valida y parsea un token JWT.
     *
     * @throws JwtValidationException si el token es inválido o expiró
     */
    public JwtClaims validateAndExtract(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            RSASSAVerifier verifier = new RSASSAVerifier(rsaKey.toRSAPublicKey());
            if (!signedJWT.verify(verifier)) {
                throw new JwtValidationException("Firma JWT inválida");
            }

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            if (claims.getExpirationTime().before(new Date())) {
                throw new JwtValidationException("Token JWT expirado");
            }

            return new JwtClaims(
                claims.getSubject(),
                claims.getStringClaim("email"),
                UserRole.valueOf(claims.getStringClaim("role"))
            );

        } catch (JwtValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new JwtValidationException("Token JWT inválido: " + e.getMessage());
        }
    }

    /**
     * Carga un par de claves RSA desde archivos PEM en disco.
     * Espera la clave privada en privateKeyPath y la pública en publicKeyPath.
     * Soporta rutas con prefijo "classpath:" o rutas absolutas del filesystem.
     */
    private RSAKey loadKeyFromPath(String path) throws Exception {
        byte[] privateBytes = readPemBytes(jwtProperties.privateKeyPath());
        byte[] publicBytes  = readPemBytes(jwtProperties.publicKeyPath());

        // Parsear clave privada (PKCS#8)
        String privatePem = new String(privateBytes)
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replace("-----BEGIN RSA PRIVATE KEY-----", "")
                .replace("-----END RSA PRIVATE KEY-----", "")
                .replaceAll("\\s", "");
        byte[] privateDer = java.util.Base64.getDecoder().decode(privatePem);

        java.security.KeyFactory kf = java.security.KeyFactory.getInstance("RSA");
        java.security.interfaces.RSAPrivateKey privateKey =
                (java.security.interfaces.RSAPrivateKey) kf.generatePrivate(
                        new java.security.spec.PKCS8EncodedKeySpec(privateDer));

        // Parsear clave pública (X.509)
        String publicPem = new String(publicBytes)
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");
        byte[] publicDer = java.util.Base64.getDecoder().decode(publicPem);
        java.security.interfaces.RSAPublicKey publicKey =
                (java.security.interfaces.RSAPublicKey) kf.generatePublic(
                        new java.security.spec.X509EncodedKeySpec(publicDer));

        return new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID("mstc-jwt-key")
                .build();
    }

    /** Lee los bytes de un PEM desde classpath o filesystem. */
    private byte[] readPemBytes(String path) throws Exception {
        if (path.startsWith("classpath:")) {
            String resource = path.substring("classpath:".length());
            try (var in = getClass().getClassLoader().getResourceAsStream(resource)) {
                if (in == null) throw new java.io.FileNotFoundException("Recurso no encontrado: " + resource);
                return in.readAllBytes();
            }
        }
        return java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(path));
    }

    public record JwtClaims(String userId, String email, UserRole role) {}

    public static class JwtValidationException extends RuntimeException {
        public JwtValidationException(String message) { super(message); }
    }
}
