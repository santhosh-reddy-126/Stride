package com.project.taskmanager.Mapper;

import com.project.taskmanager.DTO.Request.CreateTaskRequest;
import com.project.taskmanager.DTO.Response.TaskResponse;
import com.project.taskmanager.DTO.Response.UserTasks;
import com.project.taskmanager.model.Task;

import java.util.ArrayList;
import java.util.List;

public class TaskMapper {

    public static Task toEntity(CreateTaskRequest createTaskRequest){
        return new Task(createTaskRequest.getUserId(),
                createTaskRequest.getName(),
                createTaskRequest.getDescription(),
                createTaskRequest.getTaskStatus(),
                createTaskRequest.getTaskPriority(),
                createTaskRequest.getDueDate()
                );
    }

    public static TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getUserId(),
                task.getName(),
                task.getDescription(),
                task.getTaskStatus(),
                task.getTaskPriority(),
                task.getDueDate()
        );
    }


    public static UserTasks toUserTasksResponse(Long userId,List<Task> tasks){
        List<TaskResponse> taskResponses = new ArrayList<>();
        for(Task task : tasks){
            taskResponses.add(TaskMapper.toResponse(task));
        }
        return new UserTasks(userId, taskResponses);
    }
}
