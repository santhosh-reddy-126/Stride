package com.project.taskmanager.resource;


import com.project.taskmanager.DTO.Request.CreateProjectRequest;
import com.project.taskmanager.DTO.Request.UpdateProjectRequest;
import com.project.taskmanager.JWT.UserPrincipal;
import com.project.taskmanager.service.Contracts.ProjectService;
import io.dropwizard.auth.Auth;
import io.dropwizard.hibernate.UnitOfWork;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/project")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(
        name = "Project",
        description = "Project CRUD APIs"
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class ProjectResource {
    private final ProjectService projectService;

    public ProjectResource(ProjectService projectService){
        this.projectService = projectService;
    }

    @POST
    @UnitOfWork
    @Operation(summary = "Create a project")
    @SecurityRequirement(name = "bearerAuth")
    public Response createProject(@Parameter(hidden = true) @Auth UserPrincipal user, CreateProjectRequest createProjectRequest){
        createProjectRequest.setUserId(user.getUserId());
        return Response.status(200).entity(projectService.createProject(createProjectRequest)).build();
    }

    @GET
    @Path("/{projectId}")
    @UnitOfWork
    @Operation(summary = "Get a project")
    @SecurityRequirement(name = "bearerAuth")
    public Response getProject(@Parameter(hidden = true) @Auth UserPrincipal user, @PathParam("projectId") Long projectId){
        return Response.status(200).entity(projectService.getProject(projectId)).build();
    }

    @GET
    @Path("/myProjects")
    @UnitOfWork
    @Operation(summary = "Get my projects")
    @SecurityRequirement(name = "bearerAuth")
    public Response getMyProjects(@Parameter(hidden = true) @Auth UserPrincipal user){
        return Response.status(200).entity(projectService.getProjectsForUser(user.getUserId())).build();
    }

    @PATCH
    @Path("/{projectId}")
    @UnitOfWork
    @Operation(summary = "Update a project")
    @SecurityRequirement(name = "bearerAuth")
    public Response updateProject(@Parameter(hidden = true) @Auth UserPrincipal user,@PathParam("projectId") Long projectId, @Valid UpdateProjectRequest updateProjectRequest){
        return Response.status(200).entity(projectService.updateProject(projectId, updateProjectRequest)).build();
    }

    @DELETE
    @Path("/{projectId}")
    @UnitOfWork
    @Operation(summary = "Delete a project")
    @SecurityRequirement(name = "bearerAuth")
    public Response deleteProject(@Parameter(hidden = true) @Auth UserPrincipal user,@PathParam("projectId") Long projectId){
        return Response.status(200).entity(projectService.deleteProject(projectId)).build();
    }


}
