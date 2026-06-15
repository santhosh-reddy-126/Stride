package com.project.taskmanager.Exception;


import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class BusinessExceptionMapper
        implements ExceptionMapper<BusinessException> {

    @Override
    public Response toResponse(
            BusinessException exception
    ) {

        ErrorCode errorCode =
                exception.getErrorCode();

        ErrorResponse response =
                new ErrorResponse(
                        errorCode.name(),
                        errorCode.getMessage()
                );

        return Response
                .status(errorCode.getStatus())
                .entity(response)
                .build();
    }
}