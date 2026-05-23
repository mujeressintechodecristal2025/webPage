package org.mstc.platform.shared.exception;

public class WebhookSignatureException extends RuntimeException {
    public WebhookSignatureException(String gateway) {
        super("Firma HMAC-SHA256 inválida para webhook de pasarela: " + gateway);
    }
}
