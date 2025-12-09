package com.compareApp.project.scoring;

import org.springframework.stereotype.Service;

import com.compareApp.project.model.MobileClass;

@Service
public class ScoringService {
	private int scoreRam(String ramStr) {
        int ram = Integer.parseInt(ramStr.replace("GB","").trim());

        if (ram >= 16) return 10;
        if (ram >= 12) return 9;
        if (ram >= 8)  return 8;
        if (ram >= 6)  return 6;
        return 4;
    }

    private int scoreBattery(String batteryStr) {
        int battery = Integer.parseInt(batteryStr.replace("mAh","").trim());

        if (battery >= 6000) return 10;
        if (battery >= 5000) return 9;
        if (battery >= 4500) return 7;
        return 5;
    }

    private int scoreDisplay(String displayStr) {
        if (displayStr.contains("120Hz")) return 10;
        if (displayStr.contains("90Hz")) return 8;
        if (displayStr.contains("AMOLED")) return 7;
        return 5;
    }

    private int scoreCamera(String camStr) {
        int cam = Integer.parseInt(camStr.replace("MP","").trim());

        if (cam >= 108) return 10;
        if (cam >= 64) return 8;
        if (cam >= 48) return 6;
        return 4;
    }

    private int scoreProcessor(String processorStr) {
        processorStr = processorStr.toLowerCase();

        if (processorStr.contains("snapdragon 8")) return 10;
        if (processorStr.contains("snapdragon 7")) return 8;
        if (processorStr.contains("dimensity")) return 7;
        if (processorStr.contains("helio")) return 5;

        return 4;
    }

    public double calculateFinalScore(MobileClass mobile) {

        double ramScore = scoreRam(mobile.getRam());
        double batteryScore = scoreBattery(mobile.getBattery());
        double displayScore = scoreDisplay(mobile.getDisplay());
        double cameraScore = scoreCamera(mobile.getCamera());
        double processorScore = scoreProcessor(mobile.getProcessor());

        // weighted formula
        return ramScore * 0.20 +
               batteryScore * 0.20 +
               displayScore * 0.15 +
               cameraScore * 0.25 +
               processorScore * 0.20;
    }

}
