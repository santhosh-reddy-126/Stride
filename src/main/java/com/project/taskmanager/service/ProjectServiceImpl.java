package com.project.taskmanager.service;

import com.project.taskmanager.DAO.ProjectDAO;
import com.project.taskmanager.DAO.UserDAO;
import com.project.taskmanager.DTO.Request.CreateProjectRequest;
import com.project.taskmanager.DTO.Request.UpdateProjectRequest;
import com.project.taskmanager.DTO.Response.ProjectResponse;
import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.DTO.Response.UserProjectsResponse;
import com.project.taskmanager.Exception.BusinessException;
import com.project.taskmanager.Exception.ErrorCode;
import com.project.taskmanager.Mapper.ProjectMapper;
import com.project.taskmanager.model.Project;
import com.project.taskmanager.service.Contracts.ProjectService;

public class ProjectServiceImpl implements ProjectService {

    private final ProjectDAO projectDAO;

    public ProjectServiceImpl(ProjectDAO projectDAO){
        this.projectDAO = projectDAO;
    }

    @Override
    public ProjectResponse createProject(CreateProjectRequest createProjectRequest){
        return ProjectMapper.toResponse(projectDAO.create(ProjectMapper.toEntity(createProjectRequest)));
    }

    @Override
    public ProjectResponse getProject(Long projectId){
        Project project = projectDAO.findById(projectId).orElseThrow(() -> new BusinessException(ErrorCode.PROJECT_NOT_FOUND));
        return ProjectMapper.toResponse(project);
    }

    @Override
    public UserProjectsResponse getProjectsForUser(Long userId){
        return ProjectMapper.toUserProjectsResponse(userId, projectDAO.findByUserId(userId));
    }

    @Override
    public ProjectResponse updateProject(Long projectId, UpdateProjectRequest updateProjectRequest){
        Project project = projectDAO.findById(projectId).orElseThrow(() -> new BusinessException(ErrorCode.PROJECT_NOT_FOUND));
        Project finalProject = project;
        if(updateProjectRequest.getProjectName()!=null) {
            finalProject = projectDAO.updateName(projectId, updateProjectRequest.getProjectName());
        }
        if(updateProjectRequest.getDescription()!=null){
            finalProject = projectDAO.updateDescription(projectId, updateProjectRequest.getDescription());
        }
        return ProjectMapper.toResponse(finalProject);
    }

    @Override
    public SuccessResponse deleteProject(Long projectId){
        projectDAO.findById(projectId).orElseThrow(() -> new BusinessException(ErrorCode.PROJECT_NOT_FOUND));
        return new SuccessResponse(projectDAO.deleteProject(projectId));
    }


}
