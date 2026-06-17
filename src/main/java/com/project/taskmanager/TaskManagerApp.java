package com.project.taskmanager;

/**
 * Hello world!
 */

import com.project.taskmanager.DAO.TaskDAO;
import com.project.taskmanager.DAO.UserDAO;
import com.project.taskmanager.Exception.BusinessExceptionMapper;
import com.project.taskmanager.JWT.JWTAuthenticator;
import com.project.taskmanager.JWT.UserPrincipal;
import com.project.taskmanager.filter.CorsFilter;
import com.project.taskmanager.model.Task;
import com.project.taskmanager.model.User;
import com.project.taskmanager.resource.AuthResource;
import com.project.taskmanager.resource.CorsResource;
import com.project.taskmanager.resource.HelloResource;

import com.project.taskmanager.resource.TaskResource;
import com.project.taskmanager.service.AuthService;
import com.project.taskmanager.service.TaskService;
import com.project.taskmanager.service.UserService;
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
                    Task.class) {

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




        UserService userService = new UserService(userDAO);
        AuthService authService = new AuthService(userService);
        TaskService taskService = new TaskService(taskDAO);



        environment.jersey().register(new AuthResource(authService));
        environment.jersey().register(new TaskResource(taskService));

    }
}