package com.pvp.erpv.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
    }
)
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

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

  public User() {
  }

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
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
