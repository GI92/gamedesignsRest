package com.gamedesigns.web.rest;

import com.gamedesigns.domain.Design;
import com.gamedesigns.service.DesignService;
import com.gamedesigns.service.dto.DesignDTO;
import com.gamedesigns.service.mapper.DesignMapper;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Optional;

@RestController
@RequestMapping("/api/design")
public class DesignResource {

    private final DesignService designService;
    private final DesignMapper designMapper;

    public DesignResource(DesignService designService, DesignMapper designMapper) {
        this.designService = designService;
        this.designMapper = designMapper;
    }

    @GetMapping(path = "all")
    public Page<DesignDTO> getAllDesigns() {
        final Page<Design> allDesigns = designService.getAllDesigns(0, 10);

        return allDesigns.map(designMapper::toDestination);
    }

    @GetMapping(path = "all/{username}")
    public Page<DesignDTO> getAllDesigns(@PathVariable("username") String username) {
        final Page<Design> allDesigns = designService.getAllDesigns(0, 10, username);

        return allDesigns.map(designMapper::toDestination);
    }

    @GetMapping(path = "{id}")
    public DesignDTO getByID(@PathParam("id") @PathVariable Long id) {
        final Optional<Design> design = designService.getByID(id);

        return design
            .map(designMapper::toDestination)
            .get();
    }

    @PostMapping
    public DesignDTO createDesign(@RequestBody DesignDTO designDTO) {
        final Design design = designService.create(designDTO);

        return designMapper.toDestination(design);
    }

    @PatchMapping
    public DesignDTO updateDesign(@RequestBody DesignDTO designDTO) {
        final Design design = designService.update(designDTO);

        return designMapper.toDestination(design);
    }

    @DeleteMapping(path = "{id}")
    public void deleteDesign(@PathVariable Long id) {
        designService.delete(id);
    }
}
