package com.project.taskmanager.DTO.Response;

public class ProjectResponse {

    private Long projectId;

    private Long userId;

    private String projectName;

    private String description;

    public ProjectResponse(Long projectId, Long userId, String projectName, String description) {
        this.projectId = projectId;
        this.userId = userId;
        this.projectName = projectName;
        this.description = description;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
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
