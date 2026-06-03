package org.mstc.platform.modules.auth.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

interface DonorJpaRepository extends JpaRepository<DonorJpaEntity, UUID> {
    Optional<DonorJpaEntity> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByIdentificationNumber(String identificationNumber);
}
