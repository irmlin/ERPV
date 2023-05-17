package com.pvp.erpv.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_avatar")
public class UserAvatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "avatar_id")
    private Long avatarId;

    public UserAvatar(Long userId, Long avatarId) {
        this.userId = userId;
        this.avatarId = avatarId;
    }

    public UserAvatar() {

    }
}
