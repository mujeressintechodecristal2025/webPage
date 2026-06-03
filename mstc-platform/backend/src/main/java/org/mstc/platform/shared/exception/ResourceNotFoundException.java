package org.mstc.platform.shared.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Object id) {
        super(resource + " con id '" + id + "' no fue encontrado");
    }
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
