package com.example.experiment7.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

/**
 * JPA entity representing an application user.
 *
 * <p>Roles are stored as a simple {@link ElementCollection} of strings
 * (e.g. "ROLE_USER", "ROLE_ADMIN") so no separate Role table is required,
 * keeping the schema minimal while remaining fully compatible with
 * Spring Security's {@code GrantedAuthority} contract.
 */
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Unique login name. */
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    /** BCrypt-encoded password — never stored in plain text. */
    @Column(nullable = false)
    private String password;

    /** Account is active when {@code true}. */
    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = true;

    /**
     * Set of role strings assigned to this user.
     * Values follow Spring Security convention: "ROLE_USER", "ROLE_ADMIN", …
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "role")
    @Builder.Default
    private Set<String> roles = new HashSet<>();
}
