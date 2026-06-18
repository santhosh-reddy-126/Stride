package com.project.taskmanager.DTO.Response;

public class SuccessResponse {

    private Boolean success;

    public SuccessResponse(Boolean success){
        this.success = success;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}
