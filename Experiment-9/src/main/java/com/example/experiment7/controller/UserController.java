package com.example.experiment7.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.stream.Collectors;

/**
 * Controller for endpoints accessible to authenticated users (ROLE_USER or ROLE_ADMIN).
 *
 * <p>Mapped to {@code /api/user/**}. Security rules enforced by
 * {@code SecurityConfig}: {@code hasAnyRole("USER", "ADMIN")}.
 */
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    /**
     * Returns a personalised welcome message for the authenticated user.
     *
     * <pre>
     * GET /api/user/profile
     * Authorization: Basic dXNlcjE6dXNlcjEyMw==   (user1:user123)
     * → 200 OK
     * </pre>
     *
     * @param authentication injected by Spring Security — holds principal details
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> profile(Authentication authentication) {

        String username = authentication.getName();
        String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(", "));

        log.info("User '{}' accessed /api/user/profile", username);

        return ResponseEntity.ok(Map.of(
                "message",  "Welcome, authenticated user",
                "username", username,
                "roles",    roles
        ));
    }

    /**
     * Returns account details for the currently logged-in user.
     *
     * <pre>GET /api/user/me → 200 OK</pre>
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "username",      authentication.getName(),
                "roles",         authentication.getAuthorities().stream()
                                         .map(GrantedAuthority::getAuthority)
                                         .collect(Collectors.toList()),
                "authenticated", authentication.isAuthenticated()
        ));
    }
}
