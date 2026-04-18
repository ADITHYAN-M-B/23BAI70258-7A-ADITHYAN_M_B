package com.example.jwtauth.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jwtauth.model.UserModel;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Map<String, UserModel> users = new ConcurrentHashMap<>();

    public CustomUserDetailsService(PasswordEncoder passwordEncoder) {
        users.put("user123", new UserModel("user123", passwordEncoder.encode("password123"), "ROLE_USER"));
        users.put("admin123", new UserModel("admin123", passwordEncoder.encode("admin123"), "ROLE_ADMIN"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = users.get(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return new User(
                user.getUsername(),
                user.getPassword(),
                java.util.List.of(new SimpleGrantedAuthority(user.getRole())));
    }
}
