package com.example.experiment7;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Spring Boot RBAC application.
 *
 * <p>Experiment 7 — Role-Based Access Control (RBAC) with Spring Security
 *
 * <p>Pre-loaded users (see data.sql):
 * <ul>
 *   <li>user1  / user123  → ROLE_USER</li>
 *   <li>admin1 / admin123 → ROLE_ADMIN</li>
 * </ul>
 */
@SpringBootApplication
public class Experiment7Application {

    public static void main(String[] args) {
        SpringApplication.run(Experiment7Application.class, args);
    }
}
