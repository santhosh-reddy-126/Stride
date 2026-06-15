package com.project.taskmanager;

/**
 * Hello world!
 */

import com.project.taskmanager.resource.HelloResource;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Environment;

public class TaskManagerApp
        extends Application<TaskManagerConfiguration> {

    public static void main(String[] args) throws Exception {
        new TaskManagerApp().run(args);
    }

    @Override
    public void run(
            TaskManagerConfiguration configuration,
            Environment environment) {

        environment.jersey().register(new HelloResource());
    }
}