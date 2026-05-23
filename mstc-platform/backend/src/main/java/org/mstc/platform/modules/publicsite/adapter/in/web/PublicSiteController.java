package org.mstc.platform.modules.publicsite.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.mstc.platform.modules.publicsite.domain.model.ContentItem;
import org.mstc.platform.modules.publicsite.domain.port.in.GetSectionContentUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/content")
@RequiredArgsConstructor
public class PublicSiteController {

    private final GetSectionContentUseCase getSectionContentUseCase;

    @GetMapping("/{section}")
    public ResponseEntity<List<ContentItem>> getSection(@PathVariable String section) {
        return ResponseEntity.ok(getSectionContentUseCase.getBySection(section));
    }
}
