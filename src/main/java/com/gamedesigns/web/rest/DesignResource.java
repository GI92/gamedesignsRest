package com.gamedesigns.web.rest;

import com.gamedesigns.domain.Design;
import com.gamedesigns.service.DesignService;
import com.gamedesigns.service.dto.DesignDTO;
import com.gamedesigns.service.mapper.DesignMapper;
import io.github.jhipster.web.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.websocket.server.PathParam;
import java.util.List;
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
    public ResponseEntity<List<DesignDTO>> getAllDesigns(Pageable pageable) {
        final Page<DesignDTO> page = designService.getAllDesigns(pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping(path = "all/{username}")
    public ResponseEntity<List<DesignDTO>> getAllDesigns(Pageable pageable, @PathVariable("username") String username) {
        final Page<DesignDTO> page = designService.getAllDesigns(pageable, username);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping(path = "{id}")
    public DesignDTO getByID(@PathParam("id") @PathVariable Long id) {
        final Optional<Design> design = designService.getByID(id);

        return design
            .map(designMapper::toDestination)
            .orElse(new DesignDTO());
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
