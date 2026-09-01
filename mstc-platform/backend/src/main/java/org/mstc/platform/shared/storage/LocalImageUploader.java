package org.mstc.platform.shared.storage;

import lombok.extern.slf4j.Slf4j;
import org.mstc.platform.shared.exception.BusinessRuleException;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

/**
 * Implementación de subida de imágenes para el perfil LOCAL.
 * Guarda los archivos en disco (carpeta uploads/) y los sirve
 * estáticamente vía /uploads/**. No requiere S3 ni MinIO.
 */
@Slf4j
@Service
@Profile("local")
public class LocalImageUploader implements ImageUploader {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif");
    private static final long MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

    // Carpeta donde se guardan las imágenes (relativa al directorio de ejecución)
    private static final Path UPLOAD_DIR = Paths.get("uploads", "blog");

    @Override
    public String uploadImage(MultipartFile file) {
        validate(file);

        String extension = extensionFor(file.getContentType());
        String filename = UUID.randomUUID() + extension;

        try {
            Files.createDirectories(UPLOAD_DIR);
            Path target = UPLOAD_DIR.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            // URL relativa servida por ResourceHandler (ver WebMvcConfig)
            String url = "http://localhost:8080/uploads/blog/" + filename;
            log.info("[LOCAL] Imagen guardada en disco: {}", url);
            return url;

        } catch (IOException e) {
            log.error("[LOCAL] Error guardando imagen: {}", e.getMessage(), e);
            throw new BusinessRuleException("image-upload-failed",
                    "No se pudo guardar la imagen localmente.");
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessRuleException("image-empty", "El archivo está vacío");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new BusinessRuleException("image-too-large",
                    "La imagen supera el tamaño máximo de 10 MB");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new BusinessRuleException("image-invalid-type",
                    "Formato no permitido. Usa JPG, PNG, WEBP o GIF");
        }
    }

    private String extensionFor(String contentType) {
        return switch (contentType) {
            case "image/jpeg" -> ".jpg";
            case "image/png"  -> ".png";
            case "image/webp" -> ".webp";
            case "image/gif"  -> ".gif";
            default           -> "";
        };
    }
}
