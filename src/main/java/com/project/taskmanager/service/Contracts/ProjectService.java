package com.project.taskmanager.service.Contracts;

import com.project.taskmanager.DTO.Request.CreateProjectRequest;
import com.project.taskmanager.DTO.Request.UpdateProjectRequest;
import com.project.taskmanager.DTO.Response.ProjectResponse;
import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.DTO.Response.UserProjectsResponse;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest createProjectRequest);

    ProjectResponse getProject(Long projectId);

    UserProjectsResponse getProjectsForUser(Long userId);

    ProjectResponse updateProject(Long projectId, UpdateProjectRequest updateProjectRequest);

    SuccessResponse deleteProject(Long projectId);
}
