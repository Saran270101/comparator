package com.compareApp.project;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.compareApp.project.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class Jwtfilter extends OncePerRequestFilter{
	@Autowired
	private JwtUtil util;

	@Override
	protected void doFilterInternal(HttpServletRequest request,
	                                HttpServletResponse response,
	                                FilterChain filterChain)
	        throws ServletException, IOException {

	    String path = request.getServletPath();

	    // ✅ Skip JWT validation for public routes
	    if (path.startsWith("/auth")) {
	        filterChain.doFilter(request, response);
	        return;
	    }

	    String authHeader = request.getHeader("Authorization");

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        String token = authHeader.substring(7);
	        System.out.println("Token "+token);
	        boolean valid = util.validateJwtToken(token);
	        System.out.println("🔹 Token valid? " + valid);
	        if (valid) {
	            String email = util.extractEmail(token);
	            System.out.println("token valid for "+email);
	            var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
	            var auth = new UsernamePasswordAuthenticationToken(email, null, authorities);
	            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	            SecurityContextHolder.getContext().setAuthentication(auth);
	        }
	    }

	    filterChain.doFilter(request, response);
	    System.out.println("After setting auth: " + SecurityContextHolder.getContext().getAuthentication());
	}


	

}
