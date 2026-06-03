package org.mstc.platform.modules.auth.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.auth.domain.model.Donor;
import org.mstc.platform.modules.auth.domain.port.out.DonorRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DonorRepositoryAdapter implements DonorRepository {

    private final DonorJpaRepository jpaRepository;

    @Override
    public Optional<Donor> findByEmail(String email) {
        return jpaRepository.findByEmail(email).map(DonorJpaEntity::toDomain);
    }

    @Override
    public Optional<Donor> findById(UUID id) {
        return jpaRepository.findById(id).map(DonorJpaEntity::toDomain);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByIdentificationNumber(String identificationNumber) {
        return jpaRepository.existsByIdentificationNumber(identificationNumber);
    }

    @Override
    public Donor save(Donor donor) {
        return jpaRepository.save(DonorJpaEntity.fromDomain(donor)).toDomain();
    }
}
