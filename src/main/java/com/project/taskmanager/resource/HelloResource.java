package com.project.taskmanager.resource;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/hello")
public class HelloResource {
    @GET
    public String hello(){
        return "Hello Task Manager";
    }
}
