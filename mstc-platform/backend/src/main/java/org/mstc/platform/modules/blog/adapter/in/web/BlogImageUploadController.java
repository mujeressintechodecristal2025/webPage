package org.mstc.platform.modules.blog.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.shared.storage.ImageUploader;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Endpoint de subida de imágenes del blog.
 * POST /api/v1/admin/blog/images  (multipart/form-data, campo "file")
 * Solo administradores.
 *
 * La implementación de ImageUploader depende del perfil:
 *  - local     → LocalImageUploader (disco)
 *  - dev/prod  → ImageStorageService (S3/MinIO)
 */
@RestController
@RequestMapping("/api/v1/admin/blog/images")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class BlogImageUploadController {

    private final ImageUploader imageUploader;

    @PostMapping
    public ResponseEntity<UploadResponse> upload(@RequestParam("file") MultipartFile file) {
        String url = imageUploader.uploadImage(file);
        return ResponseEntity.ok(new UploadResponse(url));
    }

    record UploadResponse(String url) {}
}
