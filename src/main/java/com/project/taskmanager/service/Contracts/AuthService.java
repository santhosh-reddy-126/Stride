package com.project.taskmanager.service.Contracts;

import com.project.taskmanager.DTO.Request.LoginRequest;
import com.project.taskmanager.DTO.Request.SignUpRequest;
import com.project.taskmanager.DTO.Response.LoginResponse;
import com.project.taskmanager.DTO.Response.SuccessResponse;

public interface AuthService {
    SuccessResponse signUp(SignUpRequest signUpRequest);

    LoginResponse login(LoginRequest loginRequest);
}
