package com.project.taskmanager.resource;


import com.project.taskmanager.DTO.Request.CreateTaskRequest;
import com.project.taskmanager.DTO.Request.UpdateTaskRequest;
import com.project.taskmanager.JWT.UserPrincipal;
import com.project.taskmanager.model.enums.DueStatus;
import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;
import com.project.taskmanager.service.Contracts.TaskService;
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
    public Response createTask(@Parameter(hidden = true) @Auth UserPrincipal user, @Valid CreateTaskRequest createTaskRequest){
        createTaskRequest.setUserId(user.getUserId());
        return Response.status(201).entity(taskService.createTask(createTaskRequest)).build();
    }

    @GET
    @Path("/{taskId}")
    @UnitOfWork
    @Operation(summary = "Get a task")
    @SecurityRequirement(name = "bearerAuth")
    public Response getTask(@Parameter(hidden = true) @Auth UserPrincipal user, @PathParam("taskId") Long taskId){
        return Response.status(200).entity(taskService.getTask(taskId)).build();
    }


    @PATCH
    @Path("/{taskId}")
    @UnitOfWork
    @Operation(summary = "Update a task")
    @SecurityRequirement(name = "bearerAuth")
    public Response updateTask(@Parameter(hidden = true) @Auth UserPrincipal user,@PathParam("taskId") Long taskId, @Valid UpdateTaskRequest updateTaskRequest){
        return Response.status(200).entity(taskService.updateTask(taskId, updateTaskRequest)).build();
    }


    @GET
    @UnitOfWork
    @Operation(summary = "Get my tasks")
    @Path("/myTasks")
    @SecurityRequirement(name = "bearerAuth")
    public Response getUserTasks(@Parameter(hidden = true) @Auth UserPrincipal user, @QueryParam("status") TaskStatus taskStatus, @QueryParam("priority") Priority taskPriority, @QueryParam("dueStatus")DueStatus dueStatus, @QueryParam("projectId")Long projectId){
        return Response.status(200).entity(taskService.getUserTasks(user.getUserId(), taskStatus, taskPriority, dueStatus, projectId)).build();
    }

    @DELETE
    @Path("/{taskId}")
    @UnitOfWork
    @Operation(summary = "Delete a task")
    @SecurityRequirement(name = "bearerAuth")
    public Response deleteTask(@Parameter(hidden = true) @Auth UserPrincipal user, @PathParam("taskId") Long taskId){
        return Response.status(200).entity(taskService.deleteTask(taskId)).build();
    }


}
