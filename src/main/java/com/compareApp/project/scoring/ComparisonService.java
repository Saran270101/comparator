package com.compareApp.project.scoring;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compareApp.project.model.MobileClass;
import com.compareApp.project.repo.MobileRepo;

@Service
public class ComparisonService {
	@Autowired
    private MobileRepo mobileRepo;

    @Autowired
    private ScoringService scoringService;

    public List<ScoreResponse> compareMobiles(List<Integer> mobileIds) {

        List<MobileClass> mobiles = mobileRepo.findAllById(mobileIds);

        return mobiles.stream()
                .map(m -> new ScoreResponse(
                        m,
                        scoringService.calculateFinalScore(m)
                ))
                .sorted(Comparator.comparing(ScoreResponse::getScore).reversed())
                .toList();
    }


}
