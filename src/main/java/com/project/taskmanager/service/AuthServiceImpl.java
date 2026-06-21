package com.project.taskmanager.service;

import com.project.taskmanager.DTO.Request.LoginRequest;
import com.project.taskmanager.DTO.Request.SignUpRequest;
import com.project.taskmanager.DTO.Response.LoginResponse;
import com.project.taskmanager.DTO.Response.SuccessResponse;
import com.project.taskmanager.Exception.BusinessException;
import com.project.taskmanager.Exception.ErrorCode;
import com.project.taskmanager.Mapper.UserMapper;
import com.project.taskmanager.Utils.AuthUtils;
import com.project.taskmanager.Utils.JWUtils;
import com.project.taskmanager.model.User;
import com.project.taskmanager.service.Contracts.AuthService;
import com.project.taskmanager.service.Contracts.UserService;

public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    public AuthServiceImpl(UserService userService){
        this.userService = userService;
    }

    @Override
    public SuccessResponse signUp(SignUpRequest signUpRequest){

        if(userService.getUserByEmail(signUpRequest.getEmail()).isPresent()){
            throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = new User(
          signUpRequest.getName(),
          signUpRequest.getEmail(),
                AuthUtils.hashPassword(signUpRequest.getPassword())
        );

        User storedUser = userService.createUser(user);
        return new SuccessResponse(true);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest){

        User storedUser = userService.getUserByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        validatePassword(loginRequest, storedUser);
        String token = JWUtils.generateToken(storedUser.getId(),storedUser.getEmail());
        return UserMapper.toResponse(storedUser, token);
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
