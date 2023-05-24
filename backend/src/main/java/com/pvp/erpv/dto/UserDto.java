package com.pvp.erpv.dto;

import com.pvp.erpv.models.Avatar;
import jakarta.validation.constraints.Size;

public record UserDto(@Size(max = 120) String fullName, String username, Long avatarId, Integer totalAmountOfPoints, Integer currentPoints,
                      Integer amountOfAvatars, Integer amountOfScannedPackages, Integer scannedPlastic,
                      Integer scannedPaper, Integer scannedGlass, Integer scannedNonRecyclables,
                      Integer amountOfQuestions, Integer amountOfTries, Integer correctAnswers,
                      Integer amountOfVictories, Integer quizStreak) {
}
