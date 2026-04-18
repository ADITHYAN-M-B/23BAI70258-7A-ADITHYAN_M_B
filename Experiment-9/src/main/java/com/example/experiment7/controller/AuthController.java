package com.example.experiment7.controller;

import com.example.experiment7.dto.LoginRequest;
import com.example.experiment7.dto.LoginResponse;
import com.example.experiment7.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller for authentication operations.
 *
 * <p>Endpoints:
 * <ul>
 *   <li>{@code POST /api/auth/login}  — authenticate with JSON body</li>
 *   <li>{@code POST /api/auth/logout} — invalidate the current session</li>
 * </ul>
 *
 * <p>These endpoints are open to everyone (configured in {@code SecurityConfig}).
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Authenticate a user with username + password.
     *
     * <pre>
     * POST /api/auth/login
     * Content-Type: application/json
     *
     * {
     *   "username": "user1",
     *   "password": "user123"
     * }
     * </pre>
     *
     * @param loginRequest credentials from the request body
     * @return 200 with {@link LoginResponse} on success, 401 on bad credentials
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException ex) {
            log.warn("Login failed for user '{}': {}", loginRequest.getUsername(), ex.getMessage());
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "status",  401,
                            "error",   "Unauthorized",
                            "message", "Invalid username or password"
                    ));
        }
    }

    /**
     * Convenience endpoint — confirms the API is reachable.
     *
     * <pre>GET /api/auth/status</pre>
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> status() {
        return ResponseEntity.ok(Map.of(
                "status",  "running",
                "message", "Auth service is up. POST /api/auth/login to authenticate."
        ));
    }
}
