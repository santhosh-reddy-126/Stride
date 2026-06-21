package com.project.taskmanager.DTO.Response;

import com.project.taskmanager.model.Project;

import java.util.List;

public class UserProjectsResponse {

    private Long userId;

    private List<Project> projects;

    public UserProjectsResponse(Long userId, List<Project> projects) {
        this.userId = userId;
        this.projects = projects;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
