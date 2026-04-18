package com.example.experiment7.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Response body returned by {@code POST /api/auth/login} on success.
 *
 * <p>Keeps the contract simple: username, roles, and a human-readable
 * message. No JWT is used here — authentication relies on HTTP Basic,
 * so the session cookie (or credentials) must be included in every
 * subsequent request via Postman / curl.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    /** The authenticated user's login name. */
    private String username;

    /** The roles granted to this user. */
    private Set<String> roles;

    /** A descriptive message, e.g. "Login successful". */
    private String message;
}
