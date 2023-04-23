package com.pvp.erpv.service;

import com.pvp.erpv.dto.UserDto;
import com.pvp.erpv.mapper.UserMapper;
import com.pvp.erpv.models.User;
import com.pvp.erpv.repository.UserRepository;
import com.pvp.erpv.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    public ResponseEntity<?> updateUser(HttpServletRequest request, UserDto user) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(jwt);

        Optional<User> userData = userRepository.findByUsername(username);

        if (userData.isPresent()) {
            User _user = userData.get();
            Optional.ofNullable(user.fullName()).ifPresent(_user::setFullName);
            Optional.ofNullable(user.totalAmountOfPoints()).ifPresent(_user::setTotalAmountOfPoints);
            Optional.ofNullable(user.currentPoints()).ifPresent(_user::setCurrentPoints);
            Optional.ofNullable(user.amountOfAvatars()).ifPresent(_user::setAmountOfAvatars);
            Optional.ofNullable(user.amountOfScannedPackages()).ifPresent(_user::setAmountOfScannedPackages);
            Optional.ofNullable(user.scannedPlastic()).ifPresent(_user::setScannedPlastic);
            Optional.ofNullable(user.scannedPaper()).ifPresent(_user::setScannedPaper);
            Optional.ofNullable(user.scannedGlass()).ifPresent(_user::setScannedGlass);
            Optional.ofNullable(user.scannedNonRecyclables()).ifPresent(_user::setScannedNonRecyclables);
            Optional.ofNullable(user.amountOfQuestions()).ifPresent(_user::setAmountOfQuestions);
            Optional.ofNullable(user.amountOfTries()).ifPresent(_user::setAmountOfTries);
            Optional.ofNullable(user.correctAnswers()).ifPresent(_user::setCorrectAnswers);
            Optional.ofNullable(user.amountOfVictories()).ifPresent(_user::setAmountOfVictories);
            Optional.ofNullable(user.quizStreak()).ifPresent(_user::setQuizStreak);
            return new ResponseEntity<>(userMapper.fromModelToDto(userRepository.save(_user)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getUser(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(jwt);

        Optional<User> userData = userRepository.findByUsername(username);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userMapper.fromModelToDto(userData.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
