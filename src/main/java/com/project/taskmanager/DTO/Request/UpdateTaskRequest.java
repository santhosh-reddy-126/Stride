package com.project.taskmanager.DTO.Request;

import com.project.taskmanager.model.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateTaskRequest {

    private String name;

    private String description;

    private TaskStatus taskStatus;

    public UpdateTaskRequest(){
    }

    public UpdateTaskRequest(String description, String name, TaskStatus taskStatus) {
        this.description = description;
        this.name = name;
        this.taskStatus = taskStatus;
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
