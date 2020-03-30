package com.gamedesigns.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class UnauthorizedAccessException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public UnauthorizedAccessException() {
        super(ErrorConstants.DEFAULT_TYPE, "Access unauthorized!", Status.UNAUTHORIZED);
    }
}
