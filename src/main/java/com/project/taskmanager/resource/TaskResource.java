package com.project.taskmanager.resource;


import com.project.taskmanager.DTO.Request.TaskRequest;
import com.project.taskmanager.JWT.UserPrincipal;
import com.project.taskmanager.service.TaskService;
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

@Path("/task")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(
        name = "Task",
        description = "Task CRUD Apis"
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class TaskResource {

    private final TaskService taskService;

    public TaskResource(TaskService taskService){
        this.taskService = taskService;
    }

    @POST
    @UnitOfWork
    @Operation(summary = "Create a task")
    @SecurityRequirement(name = "bearerAuth")
    public Response createTask(@Parameter(hidden = true) @Auth UserPrincipal user, @Valid TaskRequest taskRequest){
        return Response.status(200).entity(taskService.createTask(taskRequest)).build();
    }

    @GET
    @UnitOfWork
    @Operation(summary = "Get a task")
    @SecurityRequirement(name = "bearerAuth")
    public Response getTask(@Parameter(hidden = true) @Auth UserPrincipal user, @QueryParam("taskId") Long taskId){
        return Response.status(200).entity(taskService.getTask(taskId)).build();
    }


}
