package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controller for fully public endpoints — no authentication required.
 *
 * <p>Mapped to {@code /api/public/**} which is {@code permitAll()} in
 * {@code SecurityConfig}.
 */
@RestController
@RequestMapping("/api/public")
public class PublicController {

    /**
     * Health-check / smoke-test endpoint.
     *
     * <pre>GET /api/public/hello → 200 OK</pre>
     */
    @GetMapping("/hello")
    public ResponseEntity<Map<String, String>> hello() {
        return ResponseEntity.ok(Map.of(
                "message", "This is a public endpoint",
                "access",  "Everyone"
        ));
    }

    /**
     * Returns basic information about the running application.
     *
     * <pre>GET /api/public/info → 200 OK</pre>
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> info() {
        return ResponseEntity.ok(Map.of(
                "application", "Experiment 7 — Spring Boot RBAC",
                "version",     "1.0.0",
                "endpoints",   "/api/public/**, /api/auth/**, /api/user/**, /api/admin/**"
        ));
    }
}
