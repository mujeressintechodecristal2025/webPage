package org.mstc.platform.shared.crypto;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * JPA AttributeConverter que cifra/descifra automáticamente
 * columnas sensibles usando AES-256-GCM.
 *
 * Uso en entidades:
 *   @Convert(converter = AesGcmAttributeConverter.class)
 *   private String fullName;
 *
 * El valor en BD es Base64(IV || CipherText+AuthTag).
 * El valor en Java es el texto plano original.
 */
@Converter
@Component
@RequiredArgsConstructor
public class AesGcmAttributeConverter implements AttributeConverter<String, String> {

    private final AesGcmEncryptor encryptor;

    @Override
    public String convertToDatabaseColumn(String plaintext) {
        return encryptor.encrypt(plaintext);
    }

    @Override
    public String convertToEntityAttribute(String encryptedValue) {
        return encryptor.decrypt(encryptedValue);
    }
}
