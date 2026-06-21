package com.project.taskmanager.DAO;

import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.model.Project;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import java.util.List;
import java.util.Optional;

public class ProjectDAO extends AbstractDAO<Project> {

    public ProjectDAO(SessionFactory sessionFactory){
        super(sessionFactory);
    }

    public Project create(Project project){
        return persist(project);
    }

    public Optional<Project> findById(Long projectId){
        return Optional.ofNullable(get(projectId));
    }

    public List<Project> findByUserId(Long userId){
        String hq = "FROM Project p WHERE p.userId=:userId";
        Query<Project> query = currentSession().createQuery(hq, Project.class).setParameter("userId", userId);
        return query.getResultList();
    }

    public Project updateName(Long projectId, String name){
        Project project = get(projectId);
        project.setProjectName(name);
        persist(project);
        return project;
    }

    public Project updateDescription(Long projectId, String description){
        Project project = get(projectId);
        project.setDescription(description);
        persist(project);
        return project;
    }

    public boolean deleteProject(Long projectId){
        Project project = get(projectId);
        currentSession().remove(project);
        return true;
    }
}
