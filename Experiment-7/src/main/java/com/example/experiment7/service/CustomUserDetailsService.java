package com.example.experiment7.service;

import com.example.experiment7.entity.User;
import com.example.experiment7.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Spring Security {@link UserDetailsService} implementation.
 *
 * <p>Loads a {@link User} from the database by username and converts it
 * into a Spring Security {@link UserDetails} object, mapping each stored
 * role string to a {@link SimpleGrantedAuthority}.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Locate the user by their username.
     *
     * @param username the login name submitted during authentication
     * @return a fully-populated {@link UserDetails} object
     * @throws UsernameNotFoundException when no user with the given name exists
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.debug("Attempting to load user: {}", username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warn("User not found: {}", username);
                    return new UsernameNotFoundException(
                            "User not found with username: " + username);
                });

        // Convert role strings → GrantedAuthority objects
        Set<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());

        log.debug("Loaded user '{}' with authorities: {}", username, authorities);

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!user.isEnabled())
                .build();
    }
}
