package com.trustrace.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF for testing purposes
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/user/register", "/api/admin/login", "/api/roles/create", "/api/users/add").permitAll()  // Allow register/login endpoints without authentication
                        .anyRequest().authenticated()  // Require authentication for all other endpoints
                )
                .formLogin(login -> login.disable())  // Disable default login page
                .httpBasic(httpBasic -> httpBasic.disable());  // Disable basic authentication

        return http.build();
    }
}
