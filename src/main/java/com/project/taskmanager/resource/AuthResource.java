package com.project.taskmanager.resource;


import com.project.taskmanager.DTO.Request.LoginRequest;
import com.project.taskmanager.DTO.Request.SignUpRequest;
import com.project.taskmanager.service.AuthService;
import io.dropwizard.hibernate.UnitOfWork;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(
        name = "Authentication",
        description = "Authentication APIs"
)
public class AuthResource {
    private final AuthService authService;

    public AuthResource(AuthService authService){
        this.authService = authService;
    }

    @POST
    @Path("/signup")
    @UnitOfWork
    @Operation(summary = "SignUp a user")
    public Response signUp(@Valid SignUpRequest signUpRequest){
        return Response.status(200).entity(authService.signUp(signUpRequest)).build();
    }

    @POST
    @Path("/login")
    @UnitOfWork
    @Operation(summary = "Login a user")
    public Response login(@Valid LoginRequest loginRequest){
        return Response.status(200).entity(authService.login(loginRequest)).build();
    }
}
