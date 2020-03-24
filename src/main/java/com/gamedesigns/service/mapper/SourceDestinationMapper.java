package com.gamedesigns.service.mapper;

import java.util.List;

public interface SourceDestinationMapper<S, D> {

    D toDestination(S source);

    List<D> toDestinationList(List<S> sources);

    S toSource(D destination);

    List<S> toSourceList(List<D> destinations);
}
