package com.example.experiment7.config;

import com.example.experiment7.entity.User;
import com.example.experiment7.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Runs on startup and inserts pre-defined users into the H2 database.
 * Passwords are encoded at runtime using BCrypt — no hardcoded hashes needed.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.existsByUsername("user1")) {
            log.info("Users already loaded — skipping seed.");
            return;
        }

        // ── user1 / user123 → ROLE_USER ──────────────────────────────────────
        User user1 = User.builder()
                .username("user1")
                .password(passwordEncoder.encode("user123"))
                .enabled(true)
                .roles(Set.of("ROLE_USER"))
                .build();

        // ── admin1 / admin123 → ROLE_ADMIN ───────────────────────────────────
        User admin1 = User.builder()
                .username("admin1")
                .password(passwordEncoder.encode("admin123"))
                .enabled(true)
                .roles(Set.of("ROLE_ADMIN"))
                .build();

        userRepository.save(user1);
        userRepository.save(admin1);

        log.info("✅ Seeded users: user1 (ROLE_USER), admin1 (ROLE_ADMIN)");
    }
}
