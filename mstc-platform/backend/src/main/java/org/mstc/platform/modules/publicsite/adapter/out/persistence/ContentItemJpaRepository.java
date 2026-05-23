package org.mstc.platform.modules.publicsite.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

interface ContentItemJpaRepository extends JpaRepository<ContentItemJpaEntity, UUID> {
    List<ContentItemJpaEntity> findBySectionAndPublishedOrderBySortOrderAsc(
            String section, boolean published);
}
