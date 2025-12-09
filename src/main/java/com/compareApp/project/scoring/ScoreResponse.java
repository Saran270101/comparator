package com.compareApp.project.scoring;

import com.compareApp.project.model.MobileClass;

public class ScoreResponse {
	private MobileClass mobile;
    private double score;

    public ScoreResponse(MobileClass mobile, double score) {
        this.mobile = mobile;
        this.score = score;
    }

    public MobileClass getMobile() {
        return mobile;
    }

    public double getScore() {
        return score;
    }


}
