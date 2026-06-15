package com.project.taskmanager.service;

import com.project.taskmanager.DTO.Request.LoginRequest;
import com.project.taskmanager.DTO.Request.SignUpRequest;
import com.project.taskmanager.DTO.Response.UserResponse;
import com.project.taskmanager.Exception.UserException;
import com.project.taskmanager.Utils.AuthUtils;
import com.project.taskmanager.model.User;

import java.util.Optional;

public class AuthService {

    private UserService userService;

    public AuthService(UserService userService){
        this.userService = userService;
    }

    public UserResponse signUp(SignUpRequest signUpRequest){

        if(userService.getUserByEmail(signUpRequest.getEmail()).isPresent()){
            throw new UserException("User Already Exists!");
        }

        User user = new User(
          signUpRequest.getName(),
          signUpRequest.getEmail(),
                AuthUtils.hashPassword(signUpRequest.getPassword())
        );

        User storedUser = userService.createUser(user);
        return new UserResponse(storedUser.getName(),storedUser.getEmail());
    }

    public UserResponse login(LoginRequest loginRequest){

        Optional<User> storedUser = userService.getUserByEmail(loginRequest.getEmail());
        if(storedUser.isEmpty()){
            throw new UserException("User does not exist!");
        }

        System.out.println(loginRequest.getPassword()+"---"+storedUser.get().getPasswordHash());

        if(AuthUtils.verifyPassword(loginRequest.getPassword(),storedUser.get().getPasswordHash())){
            return new UserResponse(storedUser.get().getName(),storedUser.get().getEmail());
        }else{
            throw new UserException("Wrong Credentials!");
        }


    }





}
