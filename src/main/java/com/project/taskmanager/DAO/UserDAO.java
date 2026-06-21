package com.project.taskmanager.DAO;

import com.project.taskmanager.model.User;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.Optional;

public class UserDAO extends AbstractDAO<User> {

    public UserDAO(SessionFactory sessionFactory){
        super(sessionFactory);
    }

    public User create(User user){
        return persist(user);
    }

    public Optional<User> findByEmail(String email) {

        User user = currentSession()
                .createQuery(
                        "FROM User WHERE email = :email",
                        User.class)
                .setParameter("email", email)
                .uniqueResult();

        return Optional.ofNullable(user);
    }

    public Optional<User> findById(Long userId){
        return Optional.ofNullable(get(userId));
    }


}
