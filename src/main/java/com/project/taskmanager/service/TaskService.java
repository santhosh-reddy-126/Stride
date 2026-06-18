package com.project.taskmanager.service;

import com.project.taskmanager.DAO.TaskDAO;
import com.project.taskmanager.DTO.Request.CreateTaskRequest;
import com.project.taskmanager.DTO.Request.UpdateTaskRequest;
import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.DTO.Response.TaskResponse;
import com.project.taskmanager.DTO.Response.UserTasks;
import com.project.taskmanager.Exception.BusinessException;
import com.project.taskmanager.Exception.ErrorCode;
import com.project.taskmanager.Mapper.TaskMapper;
import com.project.taskmanager.model.Task;
import com.project.taskmanager.model.enums.TaskStatus;

public class TaskService {

    private final TaskDAO taskDAO;

    public TaskService(TaskDAO taskDAO){
        this.taskDAO = taskDAO;
    }

    public TaskResponse createTask(CreateTaskRequest createTaskRequest){
        // preset value for create task
        createTaskRequest.setTaskStatus(TaskStatus.CREATED);
        Task task = TaskMapper.toEntity(createTaskRequest);
        taskDAO.create(task);
        return TaskMapper.toResponse(task);
    }

    public TaskResponse getTask(Long taskId){
        Task task = taskDAO.findById(taskId).orElseThrow(
                () -> new BusinessException(ErrorCode.TASK_NOT_FOUND)
        );

        return TaskMapper.toResponse(task);
    }

    public UserTasks getUserTasks(Long userId){
        return TaskMapper.toUserTasksResponse(userId, taskDAO.findTasksByUserId(userId));
    }

    public TaskResponse updateTask(Long taskId, UpdateTaskRequest updateTaskRequest){
        Task task = taskDAO.findById(taskId).orElseThrow(
                () -> new BusinessException(ErrorCode.TASK_NOT_FOUND));
        Task resultTask = task;
        if(updateTaskRequest.getName()!=null){
            resultTask = taskDAO.updateName(taskId, updateTaskRequest.getName());
        }

        if(updateTaskRequest.getDescription()!=null){
            resultTask = taskDAO.updateDescription(taskId, updateTaskRequest.getDescription());
        }

        if(updateTaskRequest.getTaskStatus()!=null){
            resultTask = taskDAO.updateTaskStatus(taskId, updateTaskRequest.getTaskStatus());
        }

        return TaskMapper.toResponse(resultTask);
    }

    public SuccessResponse deleteTask(Long taskId){
        taskDAO.findById(taskId).orElseThrow(
                () -> new BusinessException(ErrorCode.TASK_NOT_FOUND));
        return new SuccessResponse(taskDAO.delete(taskId));
    }
}
