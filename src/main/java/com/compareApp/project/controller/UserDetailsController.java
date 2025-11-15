package com.compareApp.project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compareApp.project.model.UserDetail;
import com.compareApp.project.repo.UserDetailsRepo;
import com.compareApp.project.service.UserDetailsService;
import com.compareApp.project.util.JwtUtil;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/auth")
@Slf4j
public class UserDetailsController {
	
	@Autowired
	private UserDetailsService userService;
	@Autowired
	private UserDetailsRepo userRepo;
	@Autowired
	private PasswordEncoder passEncoder;
	@Autowired
	private JwtUtil util;
	
	@GetMapping
	public String welcomeMessage() {
		return "Welcome to Compare app";
	}
	@PostMapping("/register")
	public ResponseEntity<String> createUser(@RequestBody Map<String,String> body){
		String email=body.get("email");
		String password=body.get("password");
		String phone=body.get("phone");
		System.out.println(body);
		if(userRepo.findByEmail(email).isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exist");
		}
		UserDetail user = new UserDetail();
	    user.setEmail(email);
	    user.setPassword(passEncoder.encode(password));
	    user.setPhone(phone);

	    userService.createUser(user);

		return ResponseEntity.status(HttpStatus.CREATED).body("Successfully Registered");
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String,String> body) {
		String email=body.get("email");
		String pass=body.get("password");
		
		var userOptional=userRepo.findByEmail(email);
		if(userOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User Not Registered");
		}
		UserDetail user=userOptional.get();
		
		if(!passEncoder.matches(pass, user.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid User");
		}
		String token=util.generateToken(email);
		return ResponseEntity.ok(Map.of("token",token));
	}

}
