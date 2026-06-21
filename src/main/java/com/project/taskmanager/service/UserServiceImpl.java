package com.project.taskmanager.service;

import com.project.taskmanager.DAO.UserDAO;
import com.project.taskmanager.model.User;
import com.project.taskmanager.service.Contracts.UserService;

import java.util.Optional;

public class UserServiceImpl implements UserService {

    private final UserDAO userDAO;

    public UserServiceImpl(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    @Override
    public User createUser(User user){
        return userDAO.create(user);
    }

    @Override
    public Optional<User> getUserByEmail(String email){
        return userDAO.findByEmail(email);
    }


}
