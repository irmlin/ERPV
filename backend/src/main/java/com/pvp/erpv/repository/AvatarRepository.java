package com.pvp.erpv.repository;

import com.pvp.erpv.models.Avatar;
import com.pvp.erpv.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Long> {
}