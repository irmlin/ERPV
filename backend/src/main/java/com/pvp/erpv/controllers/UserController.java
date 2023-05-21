package com.pvp.erpv.controllers;

import com.pvp.erpv.dto.AddUserAvatarDto;
import com.pvp.erpv.dto.UserDto;
import com.pvp.erpv.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @PutMapping()
    public ResponseEntity<?> updateUser(HttpServletRequest request, @RequestBody UserDto user) {
        return userService.updateUser(request, user);
    }

    @GetMapping()
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        return userService.getUser(request);
    }

    @GetMapping("/avatars")
    public ResponseEntity<?> getUserAvatars(HttpServletRequest request) {
        return userService.getUserAvatars(request);
    }

    @PutMapping("/avatars")
    public ResponseEntity<?> addUserAvatar(HttpServletRequest request, @RequestBody AddUserAvatarDto addUserAvatarDto) {
        return userService.addUserAvatar(request, addUserAvatarDto);
    }
}