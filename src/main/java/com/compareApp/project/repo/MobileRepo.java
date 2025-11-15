package com.compareApp.project.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.compareApp.project.model.MobileClass;

public interface MobileRepo extends JpaRepository<MobileClass,Integer>{

}
