package com.project.taskmanager;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.core.Configuration;
import io.dropwizard.db.DataSourceFactory;
import io.federecio.dropwizard.swagger.SwaggerBundleConfiguration;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;


public class TaskManagerConfiguration extends Configuration {
    @Valid
    @NotNull
    private DataSourceFactory dataSourceFactory = new DataSourceFactory();

    public SwaggerBundleConfiguration swagger;

    @JsonProperty("database")
    public DataSourceFactory getDatabase() {
        return dataSourceFactory;
    }

    @JsonProperty("database")
    public void setDatabase(DataSourceFactory dataSourceFactory) {
        this.dataSourceFactory = dataSourceFactory;
    }
}
