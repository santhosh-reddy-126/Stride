package com.project.taskmanager.service.Contracts;

import com.project.taskmanager.DTO.Request.CreateTaskRequest;
import com.project.taskmanager.DTO.Request.UpdateTaskRequest;
import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.DTO.Response.TaskResponse;
import com.project.taskmanager.DTO.Response.UserTasksResponse;
import com.project.taskmanager.model.enums.DueStatus;
import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;

public interface TaskService {
    TaskResponse createTask(CreateTaskRequest createTaskRequest);

    TaskResponse getTask(Long taskId);

    UserTasksResponse getUserTasks(Long userId, TaskStatus taskStatus, Priority priority, DueStatus dueStatus, Long projectId);

    TaskResponse updateTask(Long taskId, UpdateTaskRequest updateTaskRequest);

    SuccessResponse deleteTask(Long taskId);
}
