package com.project.taskmanager.DTO.Request;

import com.project.taskmanager.model.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTaskRequest {
    @NotNull(message = "userId mapping cannot be null")
    private Long userId;

    @NotBlank(message = "Task Name is required")
    @NotNull(message = "Name cannot be null")
    private String name;

    @NotNull(message = "Description cannot be null")
    private String description;

    @NotNull(message = "task status cannot be null")
    private TaskStatus taskStatus;

    public CreateTaskRequest(){
    }

    public CreateTaskRequest(Long userId, String description, String name, TaskStatus taskStatus) {
        this.userId = userId;
        this.description = description;
        this.name = name;
        this.taskStatus = taskStatus;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }
}
