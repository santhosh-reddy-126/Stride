package com.project.taskmanager.DAO;

import com.project.taskmanager.DTO.Request.UpdateTaskRequest;
import com.project.taskmanager.model.Task;
import com.project.taskmanager.model.enums.DueStatus;
import com.project.taskmanager.model.enums.Priority;
import com.project.taskmanager.model.enums.TaskStatus;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public List<Task> findTasksByUserId(
            Long userId,
            TaskStatus taskStatus,
            Priority priority,
            DueStatus dueStatus
    ) {

        String hql = """
        FROM Task t
        WHERE t.userId = :userId
        AND (:status IS NULL OR t.taskStatus = :status)
        AND (:priority IS NULL OR t.taskPriority = :priority)
        """;

        if (dueStatus == DueStatus.NO_DUE_DATE) {

            hql += " AND t.dueDate IS NULL";

        } else if (dueStatus == DueStatus.OVERDUE) {

            hql += """
            AND t.taskStatus != :completedStatus
            AND t.dueDate < :now
            """;

        } else if (dueStatus == DueStatus.TODAY) {

            hql += """
            AND t.taskStatus != :completedStatus
            AND DATE(t.dueDate) = :today
            AND t.dueDate >= :now
            """;

        } else if (dueStatus == DueStatus.UPCOMING) {

            hql += """
            AND t.taskStatus != :completedStatus
            AND DATE(t.dueDate) > :today
            """;
        }

        Query<Task> query = currentSession()
                .createQuery(hql, Task.class)
                .setParameter("userId", userId)
                .setParameter("status", taskStatus)
                .setParameter("priority", priority);

        if (hql.contains(":today")) {
            query.setParameter("today", LocalDate.now());
        }

        if (hql.contains(":now")) {
            query.setParameter("now", LocalDateTime.now());
        }

        if (hql.contains(":completedStatus")) {
            query.setParameter("completedStatus", TaskStatus.COMPLETED);
        }

        return query.getResultList();
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
