package org.mstc.platform.modules.auth.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.auth.domain.model.AdminUser;
import org.mstc.platform.modules.auth.domain.port.out.AdminUserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AdminUserRepositoryAdapter implements AdminUserRepository {

    private final AdminUserJpaRepository jpaRepository;

    @Override
    public Optional<AdminUser> findByEmail(String email) {
        return jpaRepository.findByEmail(email).map(AdminUserJpaEntity::toDomain);
    }

    @Override
    public Optional<AdminUser> findById(UUID id) {
        return jpaRepository.findById(id).map(AdminUserJpaEntity::toDomain);
    }

    @Override
    public AdminUser save(AdminUser adminUser) {
        return jpaRepository.save(AdminUserJpaEntity.fromDomain(adminUser)).toDomain();
    }
}
