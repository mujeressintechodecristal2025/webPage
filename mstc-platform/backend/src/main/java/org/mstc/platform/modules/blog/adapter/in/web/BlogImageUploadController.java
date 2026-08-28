package org.mstc.platform.modules.blog.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.shared.storage.ImageStorageService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Endpoint de subida de imágenes del blog.
 * POST /api/v1/admin/blog/images  (multipart/form-data, campo "file")
 * Solo administradores. No se carga en perfil local (sin S3).
 */
@RestController
@RequestMapping("/api/v1/admin/blog/images")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Profile("!local")
public class BlogImageUploadController {

    private final ImageStorageService imageStorageService;

    @PostMapping
    public ResponseEntity<UploadResponse> upload(@RequestParam("file") MultipartFile file) {
        String url = imageStorageService.uploadImage(file);
        return ResponseEntity.ok(new UploadResponse(url));
    }

    record UploadResponse(String url) {}
}
