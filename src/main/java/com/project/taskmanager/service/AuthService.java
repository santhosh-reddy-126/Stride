package com.project.taskmanager.service;

import com.project.taskmanager.DTO.Request.LoginRequest;
import com.project.taskmanager.DTO.Request.SignUpRequest;
import com.project.taskmanager.DTO.Response.UserResponse;
import com.project.taskmanager.Exception.BusinessException;
import com.project.taskmanager.Exception.ErrorCode;
import com.project.taskmanager.Mapper.UserMapper;
import com.project.taskmanager.Utils.AuthUtils;
import com.project.taskmanager.model.User;

import java.util.Optional;

public class AuthService {

    private final UserService userService;

    public AuthService(UserService userService){
        this.userService = userService;
    }

    public UserResponse signUp(SignUpRequest signUpRequest){

        if(userService.getUserByEmail(signUpRequest.getEmail()).isPresent()){
            throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = new User(
          signUpRequest.getName(),
          signUpRequest.getEmail(),
                AuthUtils.hashPassword(signUpRequest.getPassword())
        );

        User storedUser = userService.createUser(user);
        return UserMapper.toResponse(storedUser);
    }

    public UserResponse login(LoginRequest loginRequest){

        Optional<User> storedUser = userService.getUserByEmail(loginRequest.getEmail());
        if(storedUser.isEmpty()){
            throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        }

        validatePassword(loginRequest, storedUser.get());
        return UserMapper.toResponse(storedUser.get());


    }

    private void validatePassword(
            LoginRequest request,
            User user) {

        if (!AuthUtils.verifyPassword(
                request.getPassword(),
                user.getPasswordHash())) {

            throw new BusinessException(ErrorCode.INVALID_CREDENTIALS);
        }
    }





}
