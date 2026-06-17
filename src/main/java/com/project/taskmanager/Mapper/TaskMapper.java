package com.project.taskmanager.Mapper;

import com.project.taskmanager.DTO.Request.TaskRequest;
import com.project.taskmanager.DTO.Response.TaskResponse;
import com.project.taskmanager.model.Task;

public class TaskMapper {

    public static Task toEntity(TaskRequest taskRequest){
        return new Task(taskRequest.getUserId(),
                taskRequest.getName(),
                taskRequest.getDescription(),
                taskRequest.getTaskStatus());
    }

    public static TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getUserId(),
                task.getName(),
                task.getDescription(),
                task.getTaskStatus()
        );
    }
}
