package org.mstc.platform.modules.publicsite.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.publicsite.domain.model.ContentItem;
import org.mstc.platform.modules.publicsite.domain.port.out.ContentItemRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ContentItemRepositoryAdapter implements ContentItemRepository {

    private final ContentItemJpaRepository jpaRepository;

    @Override
    public List<ContentItem> findBySectionAndPublished(String section, boolean published) {
        return jpaRepository
                .findBySectionAndPublishedOrderBySortOrderAsc(section, published)
                .stream()
                .map(ContentItemJpaEntity::toDomain)
                .toList();
    }

    @Override
    public ContentItem save(ContentItem item) {
        return jpaRepository.save(ContentItemJpaEntity.fromDomain(item)).toDomain();
    }
}
