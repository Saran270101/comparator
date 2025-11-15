package com.compareApp.project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.compareApp.project.Jwtfilter;


@Configuration
public class SecurityConfig {
	 @Bean
	    public PasswordEncoder passEncoder() {
	        return new BCryptPasswordEncoder();
	    }

	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http,Jwtfilter jwtFilter) throws Exception {
	        http
	        .csrf(csrf -> csrf.disable()) // disable CSRF (only for stateless APIs)
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	            .sessionManagement(session -> session
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // no session
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/auth/**","/swagger-ui/**",
	                        "/v3/api-docs/**",
	                        "/swagger-resources/**",
	                        "/webjars/**","/api/mobile/**").permitAll() // allow /auth/**
	                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	                .anyRequest().authenticated() // secure others
	            )
	            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	        return http.build();
	    }
	    
	    @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.addAllowedOrigin("http://localhost:3000/"); // your React app
	        configuration.addAllowedMethod("*");
	        configuration.addAllowedHeader("*");
	        configuration.setAllowCredentials(true);

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }

}
