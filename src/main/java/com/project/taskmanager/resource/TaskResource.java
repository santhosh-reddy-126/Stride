package com.project.taskmanager.resource;


import com.project.taskmanager.DTO.Request.TaskRequest;
import com.project.taskmanager.service.TaskService;
import io.dropwizard.hibernate.UnitOfWork;
import io.swagger.v3.oas.annotations.Operation;
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
public class TaskResource {

    private final TaskService taskService;

    public TaskResource(TaskService taskService){
        this.taskService = taskService;
    }

    @POST
    @UnitOfWork
    @Operation(summary = "Create a task")
    public Response createTask(@Valid TaskRequest taskRequest){
        return Response.status(200).entity(taskService.createTask(taskRequest)).build();
    }

    @GET
    @UnitOfWork
    @Operation(summary = "Get a task")
    public Response getTask(@QueryParam("taskId") Long taskId){
        return Response.status(200).entity(taskService.getTask(taskId)).build();
    }


}
