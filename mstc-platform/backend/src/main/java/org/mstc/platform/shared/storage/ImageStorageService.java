package org.mstc.platform.shared.storage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mstc.platform.shared.exception.BusinessRuleException;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

/**
 * Servicio de subida de imágenes a S3 (perfiles dev/prod).
 * Valida tipo y tamaño, genera una key única y retorna la URL pública.
 */
@Slf4j
@Service
@Profile("!local")
@RequiredArgsConstructor
public class ImageStorageService implements ImageUploader {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif");
    private static final long MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

    private final S3Client s3Client;
    private final StorageProperties props;

    /**
     * Sube una imagen al bucket de imágenes y retorna su URL pública.
     *
     * @param file archivo recibido del formulario
     * @return URL pública de la imagen
     */
    @Override
    public String uploadImage(MultipartFile file) {
        validate(file);

        String extension = extensionFor(file.getContentType());
        String key = "blog/" + UUID.randomUUID() + extension;

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(props.getBucketImages())
                    .key(key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(request,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            String url = buildPublicUrl(key);
            log.info("Imagen subida: {}", url);
            return url;

        } catch (IOException e) {
            log.error("Error subiendo imagen: {}", e.getMessage(), e);
            throw new BusinessRuleException("image-upload-failed",
                    "No se pudo subir la imagen. Intenta de nuevo.");
        }
    }

    // ── Validación ────────────────────────────────────────────────────────

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

    private String buildPublicUrl(String key) {
        // MinIO local usa endpoint + path-style; AWS S3 usa virtual-host style
        if (props.getEndpoint() != null && !props.getEndpoint().isBlank()) {
            return props.getEndpoint() + "/" + props.getBucketImages() + "/" + key;
        }
        return "https://" + props.getBucketImages() + ".s3."
                + props.getRegion() + ".amazonaws.com/" + key;
    }
}
