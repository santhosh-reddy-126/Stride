package com.project.taskmanager.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;


public class JWUtils {

    private static final String SECRET =
            "hwalioehfawkhoi293qwlcsdbfjwbekj";

    public static String generateToken(Long userId, String email) {

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis()
                                + 24 * 60 * 60 * 1000))
                .signWith(
                        Keys.hmacShaKeyFor(
                                SECRET.getBytes()),
                        Jwts.SIG.HS256)
                .compact();
    }

    public static Claims validateToken(String token) {

        return Jwts.parser()
                .verifyWith(
                        Keys.hmacShaKeyFor(
                                SECRET.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
