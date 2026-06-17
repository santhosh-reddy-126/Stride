package com.project.taskmanager.Mapper;

import com.project.taskmanager.DTO.Response.LoginResponse;
import com.project.taskmanager.model.User;

public class UserMapper {

    public static LoginResponse toResponse(User user, String token) {
        return new LoginResponse(
                user.getName(),
                user.getEmail(),
                token
        );
    }
}
