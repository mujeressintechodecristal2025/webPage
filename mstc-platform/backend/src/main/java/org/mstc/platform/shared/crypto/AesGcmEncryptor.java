package org.mstc.platform.shared.crypto;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.security.Security;
import java.util.Base64;

/**
 * Servicio de cifrado AES-256-GCM.
 *
 * Formato del valor cifrado almacenado en BD:
 *   Base64(IV[12 bytes] || CipherText || AuthTag[16 bytes])
 *
 * La clave maestra se inyecta desde variable de entorno (nunca en código).
 * En producción usar AWS KMS o HashiCorp Vault para gestión de claves.
 */
@Component
public class AesGcmEncryptor {

    private static final String ALGORITHM    = "AES/GCM/NoPadding";
    private static final int    IV_LENGTH    = 12;   // 96 bits — recomendado para GCM
    private static final int    TAG_LENGTH   = 128;  // bits

    @Value("${mstc.security.encryption.master-key}")
    private String masterKeyBase64;

    private SecretKey secretKey;
    private final SecureRandom secureRandom = new SecureRandom();

    @PostConstruct
    void init() {
        Security.addProvider(new BouncyCastleProvider());
        byte[] keyBytes = Base64.getDecoder().decode(masterKeyBase64);
        if (keyBytes.length != 32) {
            throw new IllegalStateException(
                "La clave maestra AES debe ser de 256 bits (32 bytes). " +
                "Longitud actual: " + keyBytes.length + " bytes"
            );
        }
        this.secretKey = new SecretKeySpec(keyBytes, "AES");
    }

    /**
     * Cifra un texto plano con AES-256-GCM.
     *
     * @param plaintext texto a cifrar (no nulo)
     * @return Base64(IV || CipherText+AuthTag)
     */
    public String encrypt(String plaintext) {
        if (plaintext == null) return null;
        try {
            byte[] iv = new byte[IV_LENGTH];
            secureRandom.nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGORITHM, "BC");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, new GCMParameterSpec(TAG_LENGTH, iv));

            byte[] cipherText = cipher.doFinal(plaintext.getBytes("UTF-8"));

            // Concatenar IV + CipherText+AuthTag
            byte[] combined = new byte[IV_LENGTH + cipherText.length];
            System.arraycopy(iv, 0, combined, 0, IV_LENGTH);
            System.arraycopy(cipherText, 0, combined, IV_LENGTH, cipherText.length);

            return Base64.getEncoder().encodeToString(combined);
        } catch (Exception e) {
            throw new CryptoException("Error al cifrar dato sensible", e);
        }
    }

    /**
     * Descifra un valor cifrado con AES-256-GCM.
     *
     * @param encryptedBase64 Base64(IV || CipherText+AuthTag)
     * @return texto plano original
     */
    public String decrypt(String encryptedBase64) {
        if (encryptedBase64 == null) return null;
        try {
            byte[] combined = Base64.getDecoder().decode(encryptedBase64);

            byte[] iv         = new byte[IV_LENGTH];
            byte[] cipherText = new byte[combined.length - IV_LENGTH];
            System.arraycopy(combined, 0, iv, 0, IV_LENGTH);
            System.arraycopy(combined, IV_LENGTH, cipherText, 0, cipherText.length);

            Cipher cipher = Cipher.getInstance(ALGORITHM, "BC");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, new GCMParameterSpec(TAG_LENGTH, iv));

            byte[] plainBytes = cipher.doFinal(cipherText);
            return new String(plainBytes, "UTF-8");
        } catch (Exception e) {
            throw new CryptoException("Error al descifrar dato sensible", e);
        }
    }

    public static class CryptoException extends RuntimeException {
        public CryptoException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
