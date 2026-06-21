package com.project.taskmanager.DTO.Request;

import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class CreateTaskRequest {

    // not null is not required here, because whatever they pass, we update it according to auth token
    private Long userId;

    // not null is not required here, because for standalone tasks projectId is null
    private Long projectId;

    @NotBlank(message = "Task Name is required")
    @NotNull(message = "Name cannot be null")
    private String name;

    @NotNull(message = "Description cannot be null")
    private String description;

    @NotNull(message = "task status cannot be null")
    private TaskStatus taskStatus;

    @NotNull(message = "task priority cannot be null")
    private Priority taskPriority;

    private LocalDateTime dueDate;

    public CreateTaskRequest(){
    }

    public CreateTaskRequest(Long userId, Long projectId, String description, String name, TaskStatus taskStatus, Priority taskPriority, LocalDateTime dueDate) {
        this.userId = userId;
        this.projectId = projectId;
        this.description = description;
        this.name = name;
        this.taskStatus = taskStatus;
        this.taskPriority = taskPriority;
        this.dueDate = dueDate;
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

    public Priority getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(Priority taskPriority) {
        this.taskPriority = taskPriority;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
