package org.mstc.platform.modules.publicsite.domain.model;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
public class ContentItem {
    private final UUID    id;
    private final String  section;
    private final String  title;
    private final String  body;
    private final String  imageS3Key;
    private final boolean published;
    private final int     sortOrder;
    private final Instant updatedAt;
}
