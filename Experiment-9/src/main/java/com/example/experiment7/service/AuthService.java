package com.example.experiment7.service;

import com.example.experiment7.dto.LoginRequest;
import com.example.experiment7.dto.LoginResponse;
import com.example.experiment7.entity.User;
import com.example.experiment7.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service responsible for authenticating users via the login API.
 *
 * <p>Delegates credential verification to Spring Security's
 * {@link AuthenticationManager}, which internally calls
 * {@link CustomUserDetailsService} and compares BCrypt-encoded passwords.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    /**
     * Authenticate the supplied credentials and return user information.
     *
     * @param loginRequest DTO containing username and plain-text password
     * @return {@link LoginResponse} with username, roles, and a status message
     * @throws BadCredentialsException when credentials are invalid
     */
    public LoginResponse login(LoginRequest loginRequest) {

        log.info("Login attempt for user: {}", loginRequest.getUsername());

        // Throws AuthenticationException on failure — propagates as 401
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Store in SecurityContext so the session is properly established
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Collect role names from the authenticated principal
        Set<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        log.info("User '{}' authenticated successfully with roles: {}",
                loginRequest.getUsername(), roles);

        return LoginResponse.builder()
                .username(authentication.getName())
                .roles(roles)
                .message("Login successful")
                .build();
    }
}
