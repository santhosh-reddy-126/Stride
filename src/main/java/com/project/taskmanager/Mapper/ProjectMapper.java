package com.project.taskmanager.Mapper;

import com.project.taskmanager.DTO.Request.CreateProjectRequest;
import com.project.taskmanager.DTO.Response.ProjectResponse;
import com.project.taskmanager.DTO.Response.UserProjectsResponse;
import com.project.taskmanager.model.Project;

import java.util.List;
import java.util.Locale;

public class ProjectMapper {

    public static ProjectResponse toResponse(Project project){
        return new ProjectResponse(
                project.getId(),
                project.getUserId(),
                project.getProjectName(),
                project.getDescription()
        );
    }

    public static UserProjectsResponse toUserProjectsResponse(Long userId, List<Project> projects){
        return new UserProjectsResponse(
                userId,
                projects
        );
    }

    public static Project toEntity(CreateProjectRequest createProjectRequest){
        return new Project(
                createProjectRequest.getUserId(),
                createProjectRequest.getProjectName(),
                createProjectRequest.getDescription()
        );
    }
}
