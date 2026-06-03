package org.mstc.platform.modules.auth.domain.port.out;

import org.mstc.platform.modules.auth.domain.model.Donor;

import java.util.Optional;
import java.util.UUID;

/**
 * Puerto de salida — persistencia de Donor.
 */
public interface DonorRepository {
    Optional<Donor> findByEmail(String email);
    Optional<Donor> findById(UUID id);
    boolean existsByIdentificationNumber(String identificationNumber);
    boolean existsByEmail(String email);
    Donor save(Donor donor);
}
