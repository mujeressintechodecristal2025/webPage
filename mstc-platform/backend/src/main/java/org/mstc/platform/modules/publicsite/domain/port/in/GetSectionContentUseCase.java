package org.mstc.platform.modules.publicsite.domain.port.in;

import org.mstc.platform.modules.publicsite.domain.model.ContentItem;

import java.util.List;

public interface GetSectionContentUseCase {
    List<ContentItem> getBySection(String section);
}
