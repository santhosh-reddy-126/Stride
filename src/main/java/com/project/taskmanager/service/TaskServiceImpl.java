package com.project.taskmanager.service;

import com.project.taskmanager.DAO.ProjectDAO;
import com.project.taskmanager.DAO.TaskDAO;
import com.project.taskmanager.DTO.Request.CreateTaskRequest;
import com.project.taskmanager.DTO.Request.UpdateTaskRequest;
import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.DTO.Response.TaskResponse;
import com.project.taskmanager.DTO.Response.UserTasksResponse;
import com.project.taskmanager.Exception.BusinessException;
import com.project.taskmanager.Exception.ErrorCode;
import com.project.taskmanager.Mapper.TaskMapper;
import com.project.taskmanager.model.Task;
import com.project.taskmanager.model.enums.DueStatus;
import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;
import com.project.taskmanager.service.Contracts.TaskService;

public class TaskServiceImpl implements TaskService {

    private final TaskDAO taskDAO;

    private final ProjectDAO projectDAO;

    public TaskServiceImpl(TaskDAO taskDAO, ProjectDAO projectDAO){
        this.taskDAO = taskDAO;
        this.projectDAO = projectDAO;
    }

    @Override
    public TaskResponse createTask(CreateTaskRequest createTaskRequest){
        // preset value for create task
        createTaskRequest.setTaskStatus(TaskStatus.CREATED);
        Task task = TaskMapper.toEntity(createTaskRequest);
        taskDAO.create(task);
        return TaskMapper.toResponse(task);
    }

    @Override
    public TaskResponse getTask(Long taskId){
        Task task = taskDAO.findById(taskId).orElseThrow(
                () -> new BusinessException(ErrorCode.TASK_NOT_FOUND)
        );

        return TaskMapper.toResponse(task);
    }

    @Override
    public UserTasksResponse getUserTasks(Long userId, TaskStatus taskStatus, Priority priority, DueStatus dueStatus, Long projectId){
        if(projectId!=null){
            projectDAO.findById(projectId).orElseThrow(() -> new BusinessException(ErrorCode.PROJECT_NOT_FOUND));
        }
        return TaskMapper.toUserTasksResponse(userId, taskDAO.findTasksByUserId(userId, taskStatus, priority, dueStatus, projectId));
    }

    @Override
    public TaskResponse updateTask(Long taskId, UpdateTaskRequest updateTaskRequest){
        Task task = taskDAO.findById(taskId).orElseThrow(
                () -> new BusinessException(ErrorCode.TASK_NOT_FOUND));
        Task finalTask = task;
        if(updateTaskRequest.getName()!=null){
            finalTask = taskDAO.updateName(taskId, updateTaskRequest.getName());
        }

        if(updateTaskRequest.getDescription()!=null){
            finalTask = taskDAO.updateDescription(taskId, updateTaskRequest.getDescription());
        }

        if(updateTaskRequest.getTaskStatus()!=null){
            finalTask = taskDAO.updateTaskStatus(taskId, updateTaskRequest.getTaskStatus());
        }

        if(updateTaskRequest.getTaskPriority()!=null){
            finalTask = taskDAO.updateTaskPriority(taskId, updateTaskRequest.getTaskPriority());
        }

        if(updateTaskRequest.getDueDate()!=null){
            finalTask = taskDAO.updateDueDate(taskId, updateTaskRequest.getDueDate());
        }

        return TaskMapper.toResponse(finalTask);
    }

    @Override
    public SuccessResponse deleteTask(Long taskId){
        taskDAO.findById(taskId).orElseThrow(
                () -> new BusinessException(ErrorCode.TASK_NOT_FOUND));
        return new SuccessResponse(taskDAO.delete(taskId));
    }
}
