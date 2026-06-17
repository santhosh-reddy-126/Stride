package com.project.taskmanager.JWT;

import com.project.taskmanager.Utils.JWUtils;
import io.dropwizard.auth.Authenticator;
import io.jsonwebtoken.Claims;


import java.util.Optional;

public class JWTAuthenticator implements Authenticator<String, UserPrincipal> {
    @Override
    public Optional<UserPrincipal> authenticate(String token) {
        System.out.println("TOKEN = " + token);
        try {
            Claims claims = JWUtils.validateToken(token);

            return Optional.of(
                    new UserPrincipal(
                            claims.get("userId", Long.class),
                            claims.getSubject()
                    )
            );
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
