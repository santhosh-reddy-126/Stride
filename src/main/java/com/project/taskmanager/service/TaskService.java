package com.project.taskmanager.service;

import com.project.taskmanager.DAO.TaskDAO;
import com.project.taskmanager.DTO.Request.TaskRequest;
import com.project.taskmanager.DTO.Response.TaskResponse;
import com.project.taskmanager.DTO.Response.UserTasks;
import com.project.taskmanager.Exception.BusinessException;
import com.project.taskmanager.Exception.ErrorCode;
import com.project.taskmanager.Mapper.TaskMapper;
import com.project.taskmanager.model.Task;

import java.util.Optional;

public class TaskService {

    private final TaskDAO taskDAO;

    public TaskService(TaskDAO taskDAO){
        this.taskDAO = taskDAO;
    }

    public TaskResponse createTask(TaskRequest taskRequest){
        Task task = TaskMapper.toEntity(taskRequest);
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
}
