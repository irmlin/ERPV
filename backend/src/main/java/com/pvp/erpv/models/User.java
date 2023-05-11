package com.pvp.erpv.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

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

  private Integer totalAmountOfPoints;
  private Integer currentPoints;
  private Integer amountOfAvatars;
  private Integer amountOfScannedPackages;
  private Integer scannedPlastic;
  private Integer scannedPaper;
  private Integer scannedGlass;
  private Integer scannedNonRecyclables;
  private Integer amountOfQuestions;
  private Integer amountOfTries;
  private Integer correctAnswers;
  private Integer amountOfVictories;
  private Integer quizStreak;

  @ManyToMany
  @JoinTable(
          name = "user_avatar",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "avatar_id"))
  private Set<Avatar> avatars;

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

  public Integer getTotalAmountOfPoints() {
    return totalAmountOfPoints;
  }

  public void setTotalAmountOfPoints(Integer totalAmountOfPoints) {
    this.totalAmountOfPoints = totalAmountOfPoints;
  }

  public Integer getCurrentPoints() {
    return currentPoints;
  }

  public void setCurrentPoints(Integer currentPoints) {
    this.currentPoints = currentPoints;
  }

  public Integer getAmountOfAvatars() {
    return amountOfAvatars;
  }

  public void setAmountOfAvatars(Integer amountOfAvatars) {
    this.amountOfAvatars = amountOfAvatars;
  }

  public Integer getAmountOfScannedPackages() {
    return amountOfScannedPackages;
  }

  public void setAmountOfScannedPackages(Integer amountOfScannedPackages) {
    this.amountOfScannedPackages = amountOfScannedPackages;
  }

  public Integer getScannedPlastic() {
    return scannedPlastic;
  }

  public void setScannedPlastic(Integer scannedPlastic) {
    this.scannedPlastic = scannedPlastic;
  }

  public Integer getScannedPaper() {
    return scannedPaper;
  }

  public void setScannedPaper(Integer scannedPaper) {
    this.scannedPaper = scannedPaper;
  }

  public Integer getScannedGlass() {
    return scannedGlass;
  }

  public void setScannedGlass(Integer scannedGlass) {
    this.scannedGlass = scannedGlass;
  }

  public Integer getScannedNonRecyclables() {
    return scannedNonRecyclables;
  }

  public void setScannedNonRecyclables(Integer scannedNonRecyclables) {
    this.scannedNonRecyclables = scannedNonRecyclables;
  }

  public Integer getAmountOfQuestions() {
    return amountOfQuestions;
  }

  public void setAmountOfQuestions(Integer amountOfQuestions) {
    this.amountOfQuestions = amountOfQuestions;
  }

  public Integer getAmountOfTries() {
    return amountOfTries;
  }

  public void setAmountOfTries(Integer amountOfTries) {
    this.amountOfTries = amountOfTries;
  }

  public Integer getCorrectAnswers() {
    return correctAnswers;
  }

  public void setCorrectAnswers(Integer correctAnswers) {
    this.correctAnswers = correctAnswers;
  }

  public Integer getAmountOfVictories() {
    return amountOfVictories;
  }

  public void setAmountOfVictories(Integer amountOfVictories) {
    this.amountOfVictories = amountOfVictories;
  }

  public Integer getQuizStreak() {
    return quizStreak;
  }

  public void setQuizStreak(Integer quizStreak) {
    this.quizStreak = quizStreak;
  }

  public Set<Avatar> getAvatars() {
    return avatars;
  }
}
