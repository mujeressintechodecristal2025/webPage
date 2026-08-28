package org.mstc.platform.shared.storage;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

/**
 * Configura el cliente S3.
 * - Producción AWS: usa credenciales del entorno o del rol IAM.
 * - MinIO local (dev): usa endpoint personalizado + path-style.
 * No se carga en el perfil 'local' (H2 sin storage).
 */
@Configuration
@Profile("!local")
@RequiredArgsConstructor
public class S3Config {

    private final StorageProperties props;

    @Bean
    public S3Client s3Client() {
        var builder = S3Client.builder()
                .region(Region.of(props.getRegion()));

        // Endpoint personalizado (MinIO) — solo si está configurado
        if (props.getEndpoint() != null && !props.getEndpoint().isBlank()) {
            builder.endpointOverride(URI.create(props.getEndpoint()))
                   .serviceConfiguration(S3Configuration.builder()
                           .pathStyleAccessEnabled(props.isPathStyleAccess())
                           .build());
        }

        // Credenciales: explícitas si se proveen, si no el proveedor por defecto (rol IAM)
        if (props.getAccessKey() != null && !props.getAccessKey().isBlank()) {
            builder.credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create(props.getAccessKey(), props.getSecretKey())));
        } else {
            builder.credentialsProvider(DefaultCredentialsProvider.create());
        }

        return builder.build();
    }
}
