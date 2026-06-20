package com.project.taskmanager.DTO.Request;

import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class UpdateTaskRequest {

    private String name;

    private String description;

    private TaskStatus taskStatus;

    private Priority taskPriority;

    private LocalDateTime dueDate;

    public UpdateTaskRequest(){
    }

    public UpdateTaskRequest(String description, String name, TaskStatus taskStatus, Priority taskPriority, LocalDateTime dueDate) {
        this.description = description;
        this.name = name;
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
}
