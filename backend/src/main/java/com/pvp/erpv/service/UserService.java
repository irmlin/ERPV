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
            _user.setFullName(user.fullName());
            _user.setTotalAmountOfPoints(user.totalAmountOfPoints());
            _user.setCurrentPoints(user.currentPoints());
            _user.setAmountOfAvatars(user.amountOfAvatars());
            _user.setAmountOfScannedPackages(user.amountOfScannedPackages());
            _user.setScannedPlastic(user.scannedPlastic());
            _user.setScannedPaper(user.scannedPaper());
            _user.setScannedGlass(user.scannedGlass());
            _user.setScannedNonRecyclables(user.scannedNonRecyclables());
            _user.setAmountOfQuestions(user.amountOfQuestions());
            _user.setAmountOfTries(user.amountOfTries());
            _user.setCorrectAnswers(user.correctAnswers());
            _user.setAmountOfVictories(user.amountOfVictories());
            _user.setQuizStreak(user.quizStreak());
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
