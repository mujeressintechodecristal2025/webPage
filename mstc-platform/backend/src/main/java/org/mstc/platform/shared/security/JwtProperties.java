package org.mstc.platform.shared.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mstc.security.jwt")
public record JwtProperties(
    String privateKeyPath,
    String publicKeyPath,
    int expirationAdminHours,
    int expirationDonorHours
) {}
