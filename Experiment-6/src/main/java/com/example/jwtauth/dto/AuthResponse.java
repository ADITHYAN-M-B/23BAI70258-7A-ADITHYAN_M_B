package com.example.jwtauth.dto;

public class AuthResponse {
    private final String token;
    private final String tokenType;
    private final long expiresIn;
    private final String username;

    public AuthResponse(String token, String tokenType, long expiresIn, String username) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public String getUsername() {
        return username;
    }
}
