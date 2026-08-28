package org.mstc.platform.shared.storage;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Propiedades de almacenamiento de objetos (S3/MinIO).
 * Prefijo: mstc.storage
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "mstc.storage")
public class StorageProperties {

    /** Endpoint personalizado (MinIO local); vacío = AWS S3 real. */
    private String endpoint = "";

    private String accessKey;
    private String secretKey;
    private String region = "us-east-1";

    /** MinIO requiere path-style; AWS S3 usa virtual-host style. */
    private boolean pathStyleAccess = false;

    /** Buckets. */
    private String bucketImages = "mstc-images";
    private String bucketDocuments = "mstc-documents";
    private String bucketCertificates = "mstc-certificates";
}
