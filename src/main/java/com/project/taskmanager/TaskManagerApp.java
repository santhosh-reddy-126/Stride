package com.project.taskmanager;

/**
 * Hello world!
 */

import com.project.taskmanager.DAO.ProjectDAO;
import com.project.taskmanager.DAO.TaskDAO;
import com.project.taskmanager.DAO.UserDAO;
import com.project.taskmanager.Exception.BusinessExceptionMapper;
import com.project.taskmanager.JWT.JWTAuthenticator;
import com.project.taskmanager.JWT.UserPrincipal;
import com.project.taskmanager.filter.CorsFilter;
import com.project.taskmanager.model.Project;
import com.project.taskmanager.model.Task;
import com.project.taskmanager.model.User;
import com.project.taskmanager.resource.*;

import com.project.taskmanager.service.AuthServiceImpl;
import com.project.taskmanager.service.Contracts.AuthService;
import com.project.taskmanager.service.Contracts.ProjectService;
import com.project.taskmanager.service.Contracts.TaskService;
import com.project.taskmanager.service.Contracts.UserService;
import com.project.taskmanager.service.ProjectServiceImpl;
import com.project.taskmanager.service.TaskServiceImpl;
import com.project.taskmanager.service.UserServiceImpl;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.oauth.OAuthCredentialAuthFilter;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.dual.HibernateBundle;
import io.federecio.dropwizard.swagger.SwaggerBundle;
import io.federecio.dropwizard.swagger.SwaggerBundleConfiguration;

public class TaskManagerApp
        extends Application<TaskManagerConfiguration> {

    private final HibernateBundle<TaskManagerConfiguration>
            hibernateBundle =
            new HibernateBundle<>(User.class,
                    Task.class,
                    Project.class) {

                @Override
                public DataSourceFactory getDataSourceFactory(
                        TaskManagerConfiguration configuration) {
                    return configuration.getDatabase();
                }

                @Override
                public DataSourceFactory getReadSourceFactory(
                        TaskManagerConfiguration configuration) {
                    return configuration.getDatabase();
                }
            };

    @Override
    public void initialize(
            Bootstrap<TaskManagerConfiguration> bootstrap) {

        bootstrap.addBundle(hibernateBundle);

        bootstrap.addBundle(
                new SwaggerBundle<TaskManagerConfiguration>() {

                    @Override
                    protected SwaggerBundleConfiguration
                    getSwaggerBundleConfiguration(
                            TaskManagerConfiguration configuration) {

                        return configuration.swagger;
                    }
                }
        );
    }

    public static void main(String[] args) throws Exception {
        new TaskManagerApp().run(args);
    }

    @Override
    public void run(
            TaskManagerConfiguration configuration,
            Environment environment) {

        environment.jersey().register(new CorsFilter());
        environment.jersey().register(new CorsResource());
        environment.jersey().register(new HelloResource());
        environment.jersey()
                .register(new BusinessExceptionMapper());

        environment.jersey().register(
                new AuthDynamicFeature(
                        new OAuthCredentialAuthFilter.Builder<UserPrincipal>()
                                .setAuthenticator(new JWTAuthenticator())
                                .setPrefix("Bearer")
                                .buildAuthFilter()
                )
        );

        environment.jersey().register(
                new AuthValueFactoryProvider.Binder<>(
                        UserPrincipal.class));

        UserDAO userDAO = new UserDAO(hibernateBundle.getSessionFactory());
        TaskDAO taskDAO = new TaskDAO(hibernateBundle.getSessionFactory());
        ProjectDAO projectDAO = new ProjectDAO(hibernateBundle.getSessionFactory());




        UserService userService = new UserServiceImpl(userDAO);
        AuthService authService = new AuthServiceImpl(userService);
        TaskService taskService = new TaskServiceImpl(taskDAO, projectDAO);
        ProjectService projectService = new ProjectServiceImpl(projectDAO);



        environment.jersey().register(new AuthResource(authService));
        environment.jersey().register(new TaskResource(taskService));
        environment.jersey().register(new ProjectResource(projectService));

    }
}