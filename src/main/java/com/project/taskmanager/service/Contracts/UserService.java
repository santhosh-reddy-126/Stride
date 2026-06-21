package com.project.taskmanager.service.Contracts;

import com.project.taskmanager.model.User;

import java.util.Optional;

public interface UserService {
    User createUser(User user);

    Optional<User> getUserByEmail(String email);
}
