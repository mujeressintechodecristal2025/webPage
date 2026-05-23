package org.mstc.platform.shared.crypto;

import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

/**
 * Verificador de firmas HMAC-SHA256 para webhooks de pasarelas de pago.
 *
 * Mandato de seguridad: SIEMPRE verificar la firma antes de procesar
 * cualquier callback de pasarela de pago.
 */
@Component
public class HmacVerifier {

    private static final String ALGORITHM = "HmacSHA256";

    /**
     * Verifica que la firma HMAC-SHA256 del payload sea válida.
     *
     * @param payload   cuerpo del webhook (raw bytes como String)
     * @param signature firma recibida en el header (hex o base64 según pasarela)
     * @param secret    clave secreta compartida con la pasarela
     * @return true si la firma es válida
     */
    public boolean verify(String payload, String signature, String secret) {
        try {
            String computed = compute(payload, secret);
            // Comparación en tiempo constante para prevenir timing attacks
            return MessageDigest.isEqual(
                computed.getBytes(StandardCharsets.UTF_8),
                signature.getBytes(StandardCharsets.UTF_8)
            );
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Calcula la firma HMAC-SHA256 de un payload.
     *
     * @return firma en formato hexadecimal lowercase
     */
    public String compute(String payload, String secret) {
        try {
            Mac mac = Mac.getInstance(ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(
                secret.getBytes(StandardCharsets.UTF_8), ALGORITHM
            );
            mac.init(keySpec);
            byte[] hmacBytes = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hmacBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Error al calcular HMAC-SHA256", e);
        }
    }
}
