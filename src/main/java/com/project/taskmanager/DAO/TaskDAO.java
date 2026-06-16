package com.project.taskmanager.DAO;

import com.project.taskmanager.model.Task;
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

    public List<Task> findTasksByUserId(String userId){
        List<Task> tasks = currentSession()
                .createQuery("FROM Task t where t.userId=:userId")
                .setParameter("userId",userId)
                .getResultList();

        return tasks;
    }

    public void deleteTask(Long taskId){
        Task task = get(taskId);

        if(task != null){
            currentSession().remove(task);
        }
    }

}
