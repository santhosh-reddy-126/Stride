package com.project.taskmanager.DTO.Request;

public class UpdateProjectRequest {

    private String projectName;

    private String description;

    public UpdateProjectRequest() {
    }

    public UpdateProjectRequest(String projectName, String description) {
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
}
