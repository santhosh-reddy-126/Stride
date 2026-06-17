package com.project.taskmanager.DTO.Response;

import com.project.taskmanager.model.enums.TaskStatus;

public class TaskResponse {

    private Long taskId;

    private Long userId;

    private String name;

    private String description;

    private TaskStatus taskStatus;

    public TaskResponse(Long taskId, Long userId, String name, String description, TaskStatus taskStatus) {
        this.taskId = taskId;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.taskStatus = taskStatus;
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
}
