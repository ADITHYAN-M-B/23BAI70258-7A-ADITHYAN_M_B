package com.example.experiment7.repository;

import com.example.experiment7.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for {@link User} entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Lookup a user by their unique username.
     *
     * @param username the login name to search for
     * @return an {@link Optional} containing the user if found
     */
    Optional<User> findByUsername(String username);

    /**
     * Check whether a username is already taken.
     *
     * @param username the login name to check
     * @return {@code true} if a user with this name exists
     */
    boolean existsByUsername(String username);
}
