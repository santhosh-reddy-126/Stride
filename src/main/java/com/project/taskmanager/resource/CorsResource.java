package com.project.taskmanager.resource;

import jakarta.ws.rs.OPTIONS;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/")
public class CorsResource {

    @OPTIONS
    @Path("{path:.*}")
    public Response handleCorsPreFlight() {
        return Response.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, Authorization")
                .header("Access-Control-Max-Age", "3600")
                .build();
    }
}
