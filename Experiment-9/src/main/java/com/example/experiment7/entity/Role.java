package com.example.experiment7.entity;

/**
 * Enumeration of application roles.
 *
 * <p>The {@code ROLE_} prefix is required by Spring Security's default
 * {@code hasRole()} / {@code hasAnyRole()} matchers.
 */
public enum Role {

    /** Standard authenticated user — access to /api/user/** */
    ROLE_USER,

    /** Administrator — access to /api/user/** AND /api/admin/** */
    ROLE_ADMIN
}
