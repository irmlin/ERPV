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
            _user.setFullName(user.getFullName());
            _user.setTotalAmountOfPoints(user.getTotalAmountOfPoints());
            _user.setCurrentPoints(user.getCurrentPoints());
            _user.setAmountOfAvatars(user.getAmountOfAvatars());
            _user.setAmountOfScannedPackages(user.getAmountOfScannedPackages());
            _user.setScannedPlastic(user.getScannedPlastic());
            _user.setScannedPaper(user.getScannedPaper());
            _user.setScannedGlass(user.getScannedGlass());
            _user.setScannedNonRecyclables(user.getScannedNonRecyclables());
            _user.setAmountOfQuestions(user.getAmountOfQuestions());
            _user.setAmountOfTries(user.getAmountOfTries());
            _user.setCorrectAnswers(user.getCorrectAnswers());
            _user.setAmountOfVictories(user.getAmountOfVictories());
            _user.setQuizStreak(user.getQuizStreak());
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
