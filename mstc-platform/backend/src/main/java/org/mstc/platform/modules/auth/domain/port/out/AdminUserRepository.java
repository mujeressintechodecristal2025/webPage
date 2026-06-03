package org.mstc.platform.modules.auth.domain.port.out;

import org.mstc.platform.modules.auth.domain.model.AdminUser;

import java.util.Optional;
import java.util.UUID;

/**
 * Puerto de salida — persistencia de AdminUser.
 * La implementación JPA vive en el adaptador de persistencia.
 */
public interface AdminUserRepository {
    Optional<AdminUser> findByEmail(String email);
    Optional<AdminUser> findById(UUID id);
    AdminUser save(AdminUser adminUser);
}
