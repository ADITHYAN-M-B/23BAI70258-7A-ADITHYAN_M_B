package com.example.experiment7.config;

import com.example.experiment7.service.CustomUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Map;
import java.util.List;

/**
 * Central Spring Security configuration for the RBAC demo.
 *
 * <h3>Access Rules</h3>
 * <ul>
 *   <li>{@code /api/public/**}  — open to everyone (no auth required)</li>
 *   <li>{@code /api/auth/**}    — open (login endpoint)</li>
 *   <li>{@code /api/user/**}    — requires ROLE_USER or ROLE_ADMIN</li>
 *   <li>{@code /api/admin/**}   — requires ROLE_ADMIN only</li>
 *   <li>{@code /h2-console/**}  — open for development convenience</li>
 * </ul>
 *
 * <h3>Authentication</h3>
 * Both HTTP Basic Auth and a custom JSON login endpoint
 * ({@code POST /api/auth/login}) are supported simultaneously.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity          // Enables @PreAuthorize / @Secured annotations
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // ─── Password Encoder ────────────────────────────────────────────────────

    /**
     * BCrypt encoder with default strength (10 rounds).
     * Used both for encoding new passwords and for verifying stored hashes.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ─── Authentication Provider ─────────────────────────────────────────────

    /**
     * Wires our {@link CustomUserDetailsService} with BCrypt verification.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // ─── Authentication Manager ──────────────────────────────────────────────

    /**
     * Exposes the {@link AuthenticationManager} so {@code AuthService}
     * can programmatically authenticate login requests.
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:3001"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // ─── Security Filter Chain ───────────────────────────────────────────────

    /**
     * Main security filter chain defining CSRF, authorization rules,
     * HTTP Basic Auth, and custom error responses.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ── CSRF disabled (stateless / API usage) ────────────────────────
            .csrf(AbstractHttpConfigurer::disable)

            // ── Allow H2 console frames (dev only) ───────────────────────────
            .headers(headers ->
                headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
            )

            // ── Authorization rules ──────────────────────────────────────────
            .authorizeHttpRequests(auth -> auth

                // H2 console — dev convenience
                .requestMatchers("/h2-console/**").permitAll()

                // Public endpoints — no auth required
                .requestMatchers("/api/public/**").permitAll()

                // Auth endpoints — no auth required (login / register)
                .requestMatchers("/api/auth/**").permitAll()

                // User endpoints — USER or ADMIN
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")

                // Admin endpoints — ADMIN only
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // ── HTTP Basic Auth support ──────────────────────────────────────
            //    Allows Postman to send "Authorization: Basic <base64>" headers
            .httpBasic(basic -> basic
                .authenticationEntryPoint((request, response, authException) -> {
                    // Return clean JSON 401 instead of the default WWW-Authenticate challenge page
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(
                        objectMapper.writeValueAsString(Map.of(
                            "status",  401,
                            "error",   "Unauthorized",
                            "message", "Authentication required. "
                                     + "Provide valid credentials via HTTP Basic or POST /api/auth/login"
                        ))
                    );
                })
            )

            // ── 403 Forbidden handler ────────────────────────────────────────
            .exceptionHandling(ex -> ex
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(
                        objectMapper.writeValueAsString(Map.of(
                            "status",  403,
                            "error",   "Forbidden",
                            "message", "You do not have permission to access this resource"
                        ))
                    );
                })
            )

            // ── Register our custom authentication provider ──────────────────
            .authenticationProvider(authenticationProvider());

        return http.build();
    }
}
