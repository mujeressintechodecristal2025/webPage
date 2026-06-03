package org.mstc.platform.modules.publicsite.domain.port.out;

import org.mstc.platform.modules.publicsite.domain.model.ContentItem;

import java.util.List;

public interface ContentItemRepository {
    List<ContentItem> findBySectionAndPublished(String section, boolean published);
    ContentItem save(ContentItem item);
}
