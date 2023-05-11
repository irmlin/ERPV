package com.pvp.erpv.dto;

import com.pvp.erpv.models.Avatar;

import java.util.Set;

public record UserAvatarDto(Set<Avatar> avatars) {
}
