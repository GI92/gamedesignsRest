package com.gamedesigns.service.mapper;

import com.gamedesigns.domain.Design;
import com.gamedesigns.service.dto.DesignDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DesignMapper implements SourceDestinationMapper<Design, DesignDTO> {
    @Override
    public DesignDTO toDestination(Design source) {
        DesignDTO destination = new DesignDTO();
        destination.setId(source.getId());
        destination.setName(source.getName());
        destination.setDescription(source.getDescription());
        destination.setUsername(source.getUser().getLogin());

        return destination;
    }

    @Override
    public List<DesignDTO> toDestinationList(List<Design> sources) {
        return sources
            .stream()
            .map(this::toDestination)
            .collect(Collectors.toList());
    }

    @Override
    public Design toSource(DesignDTO destination) {
        Design source = new Design();
        source.setId(destination.getId());
        source.setName(destination.getName());
        source.setDescription(destination.getDescription());

        return null;
    }

    @Override
    public List<Design> toSourceList(List<DesignDTO> destinations) {
        return destinations
            .stream()
            .map(this::toSource)
            .collect(Collectors.toList());
    }
}
