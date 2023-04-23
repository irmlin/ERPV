package com.pvp.erpv.dto;

import jakarta.validation.constraints.Size;

public record UserDto(@Size(max = 120) String fullName, Integer totalAmountOfPoints, Integer currentPoints,
                      Integer amountOfAvatars, Integer amountOfScannedPackages, Integer scannedPlastic,
                      Integer scannedPaper, Integer scannedGlass, Integer scannedNonRecyclables,
                      Integer amountOfQuestions, Integer amountOfTries, Integer correctAnswers,
                      Integer amountOfVictories, Integer quizStreak) {
}
