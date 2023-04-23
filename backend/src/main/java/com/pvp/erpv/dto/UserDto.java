package com.pvp.erpv.dto;

import jakarta.validation.constraints.Size;

public record UserDto(@Size(max = 120) String fullName, int totalAmountOfPoints, int currentPoints, int amountOfAvatars,
                      int amountOfScannedPackages, int scannedPlastic, int scannedPaper, int scannedGlass,
                      int scannedNonRecyclables, int amountOfQuestions, int amountOfTries, int correctAnswers,
                      int amountOfVictories, int quizStreak) {
    public UserDto(String fullName, int totalAmountOfPoints, int currentPoints, int amountOfAvatars, int amountOfScannedPackages, int scannedPlastic, int scannedPaper, int scannedGlass, int scannedNonRecyclables, int amountOfQuestions, int amountOfTries, int correctAnswers, int amountOfVictories, int quizStreak) {
        this.fullName = fullName;
        this.totalAmountOfPoints = totalAmountOfPoints;
        this.currentPoints = currentPoints;
        this.amountOfAvatars = amountOfAvatars;
        this.amountOfScannedPackages = amountOfScannedPackages;
        this.scannedPlastic = scannedPlastic;
        this.scannedPaper = scannedPaper;
        this.scannedGlass = scannedGlass;
        this.scannedNonRecyclables = scannedNonRecyclables;
        this.amountOfQuestions = amountOfQuestions;
        this.amountOfTries = amountOfTries;
        this.correctAnswers = correctAnswers;
        this.amountOfVictories = amountOfVictories;
        this.quizStreak = quizStreak;
    }

    @Override
    public String fullName() {
        return fullName;
    }
}
