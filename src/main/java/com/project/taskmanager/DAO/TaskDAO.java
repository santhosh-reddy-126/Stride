package com.project.taskmanager.DAO;

import com.project.taskmanager.DTO.Request.UpdateTaskRequest;
import com.project.taskmanager.model.Task;
import com.project.taskmanager.model.enums.TaskStatus;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;
import java.util.*;

import java.util.Optional;

public class TaskDAO extends AbstractDAO<Task> {

    public TaskDAO(SessionFactory sessionFactory){
        super(sessionFactory);
    }

    public Task create(Task task){
        return persist(task);
    }

    public Optional<Task> findById(Long taskId){
        return Optional.ofNullable(get(taskId));
    }

    public List<Task> findTasksByUserId(Long userId) {
        List<Task> tasks = currentSession()
                .createQuery("FROM Task t where t.userId=:userId")
                .setParameter("userId", userId)
                .getResultList();

        return tasks;
    }

    public Task updateName(Long taskId, String name){
        Task task = get(taskId);
        task.setName(name);
        persist(task);
        return task;
    }

    public Task updateDescription(Long taskId, String description){
        Task task = get(taskId);
        task.setDescription(description);
        persist(task);
        return task;
    }

    public Task updateTaskStatus(Long taskId, TaskStatus taskStatus){
        Task task = get(taskId);
        task.setTaskStatus(taskStatus);
        persist(task);
        return task;
    }

    public Boolean delete(Long taskId){
        Task task = get(taskId);

        if(task != null){
            currentSession().remove(task);
            return true;
        }
        return false;
    }

}
