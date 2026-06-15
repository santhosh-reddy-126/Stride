package com.project.taskmanager.Exception;


import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class UserExceptionMapper
        implements ExceptionMapper<UserException> {

    @Override
    public Response toResponse(UserException exception) {

        ErrorResponse response =
                new ErrorResponse(exception.getMessage());

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(response)
                .build();
    }
}
