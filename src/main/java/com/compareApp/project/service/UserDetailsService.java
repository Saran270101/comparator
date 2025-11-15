package com.compareApp.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compareApp.project.model.UserDetail;
import com.compareApp.project.repo.UserDetailsRepo;

@Service
public class UserDetailsService {
	
	@Autowired
	private UserDetailsRepo userRepo;
	
	public UserDetail createUser(UserDetail user) {
		return userRepo.save(user);
	}
	
	public UserDetail getUserById(int id) {
		return userRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	}

}
