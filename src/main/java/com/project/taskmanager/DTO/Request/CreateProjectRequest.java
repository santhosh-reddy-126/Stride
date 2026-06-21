package com.project.taskmanager.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateProjectRequest {

    @NotNull(
            message = "User Id cannot be null"
    )
    private Long userId;

    @NotNull(
            message = "Project Name cannot be null"
    )
    @NotBlank(
            message = "Project Name cannot be blank"
    )
    private String projectName;

    @NotNull(
            message = "Project Name cannot be null"
    )
    private String description;

    public CreateProjectRequest(){

    }

    public CreateProjectRequest(Long userId, String projectName, String description) {
        this.userId=userId;
        this.projectName = projectName;
        this.description = description;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
