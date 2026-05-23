package org.mstc.platform.modules.auth.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

interface AdminUserJpaRepository extends JpaRepository<AdminUserJpaEntity, UUID> {
    Optional<AdminUserJpaEntity> findByEmail(String email);
}
