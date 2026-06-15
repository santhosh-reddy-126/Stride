package com.project.taskmanager.Utils;

import org.mindrot.jbcrypt.BCrypt;

public class AuthUtils {

    private static final int SALT_ROUNDS = 12;

    private AuthUtils() {
    }

    public static String hashPassword(String password) {
        return BCrypt.hashpw(
                password,
                BCrypt.gensalt(SALT_ROUNDS)
        );
    }

    public static boolean verifyPassword(
            String password,
            String hashedPassword
    ) {
        return BCrypt.checkpw(
                password,
                hashedPassword
        );
    }
}
