package com.example.experiment7.controller;

import com.example.experiment7.entity.User;
import com.example.experiment7.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Controller for admin-only endpoints.
 *
 * <p>Mapped to {@code /api/admin/**}. Primary guard is in
 * {@code SecurityConfig}: {@code hasRole("ADMIN")}.
 * Method-level {@code @PreAuthorize} provides a second layer of defence.
 */
@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;

    /**
     * Admin dashboard — confirms ADMIN access is working.
     *
     * <pre>
     * GET /api/admin/dashboard
     * Authorization: Basic YWRtaW4xOmFkbWluMTIz   (admin1:admin123)
     * → 200 OK
     * </pre>
     */
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> dashboard(Authentication authentication) {

        log.info("Admin '{}' accessed /api/admin/dashboard", authentication.getName());

        return ResponseEntity.ok(Map.of(
                "message",  "Welcome, admin",
                "username", authentication.getName(),
                "access",   "ADMIN only"
        ));
    }

    /**
     * Lists all registered users — admin only.
     *
     * <pre>GET /api/admin/users → 200 OK</pre>
     */
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> listUsers() {

        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(user -> Map.<String, Object>of(
                        "id",       user.getId(),
                        "username", user.getUsername(),
                        "roles",    user.getRoles(),
                        "enabled",  user.isEnabled()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    /**
     * System statistics — admin only.
     *
     * <pre>GET /api/admin/stats → 200 OK</pre>
     */
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> stats() {
        long totalUsers = userRepository.count();
        return ResponseEntity.ok(Map.of(
                "totalUsers",  totalUsers,
                "application", "Experiment 7 — RBAC",
                "status",      "healthy"
        ));
    }
}
