package com.pvp.erpv.mapper;

import com.pvp.erpv.dto.UserAvatarDto;
import com.pvp.erpv.dto.UserDto;
import com.pvp.erpv.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto fromModelToDto(User user) {
        return new UserDto(
            user.getFullName(),
            user.getTotalAmountOfPoints(),
            user.getCurrentPoints(),
            user.getAmountOfAvatars(),
            user.getAmountOfScannedPackages(),
            user.getScannedPlastic(),
            user.getScannedPaper(),
            user.getScannedGlass(),
            user.getScannedNonRecyclables(),
            user.getAmountOfQuestions(),
            user.getAmountOfTries(),
            user.getCorrectAnswers(),
            user.getAmountOfVictories(),
            user.getQuizStreak()
        );
    }

    public UserAvatarDto fromModelToAvatarDto(User user) {
        return new UserAvatarDto(user.getAvatars());
    }
}
