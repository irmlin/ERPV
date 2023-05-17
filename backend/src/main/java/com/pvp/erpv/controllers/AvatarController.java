package com.pvp.erpv.controllers;

import com.pvp.erpv.service.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/avatars")
public class AvatarController {
    @Autowired
    AvatarService avatarService;

    @GetMapping()
    public ResponseEntity<?> getAvatars() {
        return avatarService.getAvatars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAvatar(@PathVariable Long id) {
        return avatarService.getAvatar(id);
    }
}
