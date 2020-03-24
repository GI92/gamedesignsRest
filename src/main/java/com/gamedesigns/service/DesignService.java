package com.gamedesigns.service;

import com.gamedesigns.domain.Design;
import com.gamedesigns.domain.User;
import com.gamedesigns.repository.DesignRepository;
import com.gamedesigns.repository.UserRepository;
import com.gamedesigns.security.SecurityUtils;
import com.gamedesigns.service.dto.DesignDTO;
import com.gamedesigns.service.mapper.DesignMapper;
import com.gamedesigns.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class DesignService {

    private final Logger log = LoggerFactory.getLogger(DesignService.class);

    private final DesignRepository designRepository;
    private final UserRepository userRepository;
    private final DesignMapper designMapper;

    public DesignService(DesignRepository designRepository, UserRepository userRepository, DesignMapper designMapper) {
        this.designRepository = designRepository;
        this.userRepository = userRepository;
        this.designMapper = designMapper;
    }

    public Page<Design> getAllDesigns(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return designRepository.findAll(pageable);
    }

    public Page<Design> getAllDesigns(int page, int size, String username) {
        final Pageable pageable = PageRequest.of(page, size);
        final Optional<User> user = userRepository.findOneByLogin(username);

        return user
            .map(u -> designRepository.findAll(u, pageable))
            .orElse(Page.empty());
    }

    public Optional<Design> getByID(Long id) {
        return designRepository.findById(id);
    }

    public Design create(DesignDTO designDTO) {
        final String username = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new BadRequestAlertException("", "", ""));

        designDTO.setUsername(username);

        final Design design = designMapper.toSource(designDTO);
        return designRepository.save(design);
    }

    public void delete(Long id) {
        designRepository.deleteById(id);
    }

    public Design update(DesignDTO designDTO) {
        final String username = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new BadRequestAlertException("", "", ""));
        userRepository.findOneByLogin(username);

        final Design design = designRepository.findByIdAndUser_Login(designDTO.getId(), username);

        if (design == null) {
            throw new BadRequestAlertException("Design doesn't exist", "design.id", "idmissing");
        }

        if (designDTO.getName() != null) {
            design.setName(designDTO.getName());
        }

        if (designDTO.getDescription() != null) {
            design.setDescription(designDTO.getDescription());
        }

        return designRepository.save(design);
    }
}