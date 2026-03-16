package com.example.jwtauth.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protected")
public class ProtectedController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> protectedEndpoint(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "message", "Access granted to protected route",
                "username", authentication.getName(),
                "authorities", authentication.getAuthorities()));
    }
}
