package org.mstc.platform.modules.publicsite.domain.service;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.publicsite.domain.model.ContentItem;
import org.mstc.platform.modules.publicsite.domain.port.in.GetSectionContentUseCase;
import org.mstc.platform.modules.publicsite.domain.port.out.ContentItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicSiteService implements GetSectionContentUseCase {

    private final ContentItemRepository contentItemRepository;

    @Override
    public List<ContentItem> getBySection(String section) {
        return contentItemRepository.findBySectionAndPublished(section.toUpperCase(), true);
    }
}
