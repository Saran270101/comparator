package com.compareApp.project.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.compareApp.project.model.UserDetail;

@Repository
public interface UserDetailsRepo extends JpaRepository<UserDetail, Integer> {
	Optional<UserDetail> findByEmail(String email);

}
