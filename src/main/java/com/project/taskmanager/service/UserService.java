package com.project.taskmanager.service;

import com.project.taskmanager.DAO.UserDAO;
import com.project.taskmanager.DTO.Response.UserResponse;
import com.project.taskmanager.Exception.UserException;
import com.project.taskmanager.model.User;
import jakarta.validation.Valid;

import java.util.Optional;

public class UserService {

    private UserDAO userDAO;

    public UserService(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    public User createUser(User user){
        return userDAO.create(user);
    }

    public Optional<User> getUserByEmail(String email){
        return userDAO.findByEmail(email);
    }


}
