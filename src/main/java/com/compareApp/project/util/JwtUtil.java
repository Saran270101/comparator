package com.compareApp.project.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET="Welcome to spring learning saran senniappan. Learn more about spring boot in code io";
	private final long EXPIRE=1000*60*60;
	private final Key secretKey=Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
	
	public String generateToken(String email) {
		
		return Jwts.builder()
				.setSubject(email)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRE))
				.signWith(secretKey, SignatureAlgorithm.HS256)//digital signature
				.compact();
	}
	public String extractEmail(String token) {
//		return Jwts.parserBuilder()
//				.setSigningKey(secretKey)
//				.build()
//				.parseClaimsJws(token)
//				.getBody()
//				.getSubject();
		Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
	}
	
	public boolean validateJwtToken(String token) {
		try {
			//extractEmail(token);
			Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token);
			return true;
		}catch(JwtException exception) {
			System.out.println("error "+exception);
			return false;
		}
	}

}
