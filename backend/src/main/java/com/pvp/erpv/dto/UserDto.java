package com.pvp.erpv.dto;

import jakarta.validation.constraints.Size;

public class UserDto {
    @Size(max = 120)
    private String fullName;

    private int totalAmountOfPoints;
    private int currentPoints;
    private int amountOfAvatars;
    private int amountOfScannedPackages;
    private int scannedPlastic;
    private int scannedPaper;
    private int scannedGlass;
    private int scannedNonRecyclables;
    private int amountOfQuestions;
    private int amountOfTries;
    private int correctAnswers;
    private int amountOfVictories;
    private int quizStreak;

    public UserDto() {

    }

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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getTotalAmountOfPoints() {
        return totalAmountOfPoints;
    }

    public void setTotalAmountOfPoints(int totalAmountOfPoints) {
        this.totalAmountOfPoints = totalAmountOfPoints;
    }

    public int getCurrentPoints() {
        return currentPoints;
    }

    public void setCurrentPoints(int currentPoints) {
        this.currentPoints = currentPoints;
    }

    public int getAmountOfAvatars() {
        return amountOfAvatars;
    }

    public void setAmountOfAvatars(int amountOfAvatars) {
        this.amountOfAvatars = amountOfAvatars;
    }

    public int getAmountOfScannedPackages() {
        return amountOfScannedPackages;
    }

    public void setAmountOfScannedPackages(int amountOfScannedPackages) {
        this.amountOfScannedPackages = amountOfScannedPackages;
    }

    public int getScannedPlastic() {
        return scannedPlastic;
    }

    public void setScannedPlastic(int scannedPlastic) {
        this.scannedPlastic = scannedPlastic;
    }

    public int getScannedPaper() {
        return scannedPaper;
    }

    public void setScannedPaper(int scannedPaper) {
        this.scannedPaper = scannedPaper;
    }

    public int getScannedGlass() {
        return scannedGlass;
    }

    public void setScannedGlass(int scannedGlass) {
        this.scannedGlass = scannedGlass;
    }

    public int getScannedNonRecyclables() {
        return scannedNonRecyclables;
    }

    public void setScannedNonRecyclables(int scannedNonRecyclables) {
        this.scannedNonRecyclables = scannedNonRecyclables;
    }

    public int getAmountOfQuestions() {
        return amountOfQuestions;
    }

    public void setAmountOfQuestions(int amountOfQuestions) {
        this.amountOfQuestions = amountOfQuestions;
    }

    public int getAmountOfTries() {
        return amountOfTries;
    }

    public void setAmountOfTries(int amountOfTries) {
        this.amountOfTries = amountOfTries;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getAmountOfVictories() {
        return amountOfVictories;
    }

    public void setAmountOfVictories(int amountOfVictories) {
        this.amountOfVictories = amountOfVictories;
    }

    public int getQuizStreak() {
        return quizStreak;
    }

    public void setQuizStreak(int quizStreak) {
        this.quizStreak = quizStreak;
    }
}
