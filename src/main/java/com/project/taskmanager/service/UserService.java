package com.project.taskmanager.service;

import com.project.taskmanager.DAO.UserDAO;
import com.project.taskmanager.model.User;

import java.util.Optional;

public class UserService {

    private final UserDAO userDAO;

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
