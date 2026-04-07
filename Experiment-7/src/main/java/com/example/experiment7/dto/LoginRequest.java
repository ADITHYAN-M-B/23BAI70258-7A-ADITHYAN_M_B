package com.example.experiment7.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request body for the {@code POST /api/auth/login} endpoint.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    /** The user's login name. */
    private String username;

    /** The user's plain-text password (never persisted). */
    private String password;
}
