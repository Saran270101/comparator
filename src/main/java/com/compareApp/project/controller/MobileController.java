package com.compareApp.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compareApp.project.model.MobileClass;
import com.compareApp.project.scoring.CompareRequest;
import com.compareApp.project.scoring.ComparisonService;
import com.compareApp.project.scoring.ScoreResponse;
import com.compareApp.project.service.MobileService;

@RestController
@RequestMapping("/api/mobile")
public class MobileController {
	
	@Autowired
	private MobileService mobService;
	@Autowired
    private ComparisonService compareService;
	
	@PostMapping("/create")
	ResponseEntity<MobileClass> createMobData(@RequestBody MobileClass mob ) {
//		try {
//			MobileClass created = mobService.createMobData(mob);
//		    return ResponseEntity.status(HttpStatus.CREATED).body(created);
//		}catch (RuntimeException e) {
//			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//		}
		MobileClass created = mobService.createMobData(mob);
	    return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}
	
	@GetMapping("/allMobiles")
	ResponseEntity<List<MobileClass>> getAllMobiles(){
		return new ResponseEntity<List<MobileClass>>(mobService.getAllMob(),HttpStatus.OK);
	}
	
	@PutMapping("/update/{id}")
	ResponseEntity<MobileClass> updateMobData(@PathVariable int id,@RequestBody MobileClass mob){
		MobileClass updated=mobService.updateMobData(id,mob);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(updated);
	}
	
	

    @PostMapping("/compare")
    public ResponseEntity<List<ScoreResponse>> compareMobiles(
            @RequestBody CompareRequest request) {

        if (request.getMobileIds() == null || request.getMobileIds().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<ScoreResponse> result = compareService.compareMobiles(request.getMobileIds());

        return ResponseEntity.ok(result);
    }

}
