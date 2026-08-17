package org.mstc.platform.shared.config;

import lombok.extern.slf4j.Slf4j;
import org.mstc.platform.modules.auth.domain.port.out.AuthNotificationPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

/**
 * Configuración exclusiva del perfil 'local'.
 * Reemplaza Redis por un stub que no bloquea el arranque.
 * Reemplaza notificaciones por log en consola.
 */
@Slf4j
@Configuration
@Profile("local")
public class LocalDevConfig {

    /**
     * RedisConnectionFactory stub para local.
     * Configura timeout mínimo para que si no hay Redis, falle rápido
     * pero no impida arrancar.
     */
    @Bean
    @Primary
    public RedisConnectionFactory localRedisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration("localhost", 6379);
        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .commandTimeout(Duration.ofMillis(100))
                .build();
        LettuceConnectionFactory factory = new LettuceConnectionFactory(config, clientConfig);
        return factory;
    }

    @Bean
    @Primary
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(new StringRedisSerializer());
        template.afterPropertiesSet();
        return template;
    }

    /**
     * Notificaciones en modo consola — imprime en log, no envía email.
     */
    @Bean
    @Primary
    public AuthNotificationPort localNotificationPort() {
        return new AuthNotificationPort() {
            @Override
            public void sendWelcomeEmail(String email, String fullName) {
                log.info("[LOCAL] Email bienvenida → {} ({})", fullName, email);
            }

            @Override
            public void sendAccountLockedEmail(String email, int lockoutMinutes) {
                log.warn("[LOCAL] Email cuenta bloqueada → {} por {} min", email, lockoutMinutes);
            }

            @Override
            public void sendPasswordResetEmail(String email, String resetToken) {
                log.info("[LOCAL] Email reset → {} token={}", email, resetToken);
            }
        };
    }
}
