package org.mstc.platform.shared.exception;

import lombok.Getter;

@Getter
public class BusinessRuleException extends RuntimeException {

    private final String errorCode;

    public BusinessRuleException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    // Fábrica para errores comunes
    public static BusinessRuleException minimumDonationAmount(long minimumCop) {
        return new BusinessRuleException(
            "minimum-donation-amount",
            "El monto mínimo de donación es " + minimumCop + " COP"
        );
    }

    public static BusinessRuleException invalidFileFormat(String allowed) {
        return new BusinessRuleException(
            "invalid-file-format",
            "Formato de archivo no permitido. Formatos aceptados: " + allowed
        );
    }

    public static BusinessRuleException fileTooLarge(long maxMb) {
        return new BusinessRuleException(
            "file-too-large",
            "El archivo supera el tamaño máximo permitido de " + maxMb + " MB"
        );
    }
}
