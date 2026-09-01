package org.mstc.platform.shared.storage;

import org.springframework.web.multipart.MultipartFile;

/**
 * Contrato de subida de imágenes.
 * Implementaciones:
 *  - S3ImageUploader     (perfiles dev/prod → S3/MinIO)
 *  - LocalImageUploader  (perfil local → disco)
 */
public interface ImageUploader {

    /**
     * Sube una imagen y retorna su URL pública.
     *
     * @param file archivo recibido del formulario
     * @return URL pública de la imagen
     */
    String uploadImage(MultipartFile file);
}
