package com.project.taskmanager.Mapper;

import com.project.taskmanager.DTO.Response.UserResponse;
import com.project.taskmanager.model.User;

public class UserMapper {

    public static UserResponse toResponse(User user) {
        return new UserResponse(
                user.getName(),
                user.getEmail()
        );
    }
}
