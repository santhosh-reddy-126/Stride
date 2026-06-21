package com.project.taskmanager.Exception;

public enum ErrorCode {

    USER_NOT_FOUND(
            400,
            "Invalid email or password"
    ),

    USER_ALREADY_EXISTS(
            409,
            "User already exists"
    ),

    INVALID_CREDENTIALS(
            401,
            "Invalid email or password"
    ),

    TASK_NOT_FOUND(
            404,
            "Task not found"
    ),

    PROJECT_NOT_FOUND(
            404,
            "Project not found"
    );


    private final int status;
    private final String message;

    ErrorCode(
            int status,
            String message
    ) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
