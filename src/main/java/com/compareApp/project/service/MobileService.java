package com.compareApp.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compareApp.project.model.MobileClass;
import com.compareApp.project.repo.MobileRepo;

@Service
public class MobileService {
	
	@Autowired
	private MobileRepo mobileRepo;
	
	public MobileClass createMobData(MobileClass mob) {
		return mobileRepo.save(mob);
	}
	
	public List<MobileClass> getAllMob(){
		return mobileRepo.findAll();
	}

}
