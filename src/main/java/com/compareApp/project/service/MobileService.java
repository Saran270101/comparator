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
	
	public MobileClass updateMobData(int id,MobileClass mob) {
		MobileClass existing = mobileRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Mobile not found"));

	    if (mob.getBrand_name() != null)
	        existing.setBrand_name(mob.getBrand_name());

	    if (mob.getMobile_name() != null)
	        existing.setMobile_name(mob.getMobile_name());

	    if (mob.getImg() != null)
	        existing.setImg(mob.getImg());

	    if (mob.getDescription() != null)
	        existing.setDescription(mob.getDescription());

	    if (mob.getPrice() != null)
	        existing.setPrice(mob.getPrice());

	    if (mob.getDisplay() != null)
	        existing.setDisplay(mob.getDisplay());

	    if (mob.getCamera() != null)
	        existing.setCamera(mob.getCamera());

	    if (mob.getBattery() != null)
	        existing.setBattery(mob.getBattery());

	    if (mob.getWeight() != null)
	        existing.setWeight(mob.getWeight());

	    if (mob.getProcessor() != null)
	        existing.setProcessor(mob.getProcessor());

	    if (mob.getRam() != null)
	        existing.setRam(mob.getRam());
	    
	    if(mob.getStorage()!=null)
	    	existing.setStorage(mob.getStorage());

	    return mobileRepo.save(existing);
	}

}
