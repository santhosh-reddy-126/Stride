package com.project.taskmanager.DTO.Response;

import java.util.List;

public class UserTasksResponse {

    private Long userId;

    private List<TaskResponse> tasks;

    public UserTasksResponse(Long userId, List<TaskResponse> tasks) {
        this.userId = userId;
        this.tasks = tasks;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<TaskResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }
}
