package com.pvp.erpv.service;

import com.pvp.erpv.models.Avatar;
import com.pvp.erpv.repository.AvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AvatarService {
    @Autowired
    AvatarRepository avatarRepository;

    public ResponseEntity<?> getAvatars() {
        List<Avatar> avatarsData = avatarRepository.findAll();

        if (!avatarsData.isEmpty()) {
            return new ResponseEntity<>(avatarsData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getAvatar(Long id) {
        Optional<Avatar> avatar = avatarRepository.findById(id);

        if (avatar.isPresent()) {
            return new ResponseEntity<>(avatar, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
