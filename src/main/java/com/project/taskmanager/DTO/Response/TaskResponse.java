package com.project.taskmanager.DTO.Response;

import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;

import java.time.LocalDateTime;

public class TaskResponse {

    private Long taskId;

    private Long userId;

    private Long projectId;

    private String name;

    private String description;

    private TaskStatus taskStatus;

    private Priority taskPriority;

    private LocalDateTime dueDate;

    public TaskResponse(Long taskId, Long userId, Long projectId, String name, String description, TaskStatus taskStatus, Priority taskPriority, LocalDateTime dueDate) {
        this.taskId = taskId;
        this.userId = userId;
        this.projectId = projectId;
        this.name = name;
        this.description = description;
        this.taskStatus = taskStatus;
        this.taskPriority = taskPriority;
        this.dueDate = dueDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
