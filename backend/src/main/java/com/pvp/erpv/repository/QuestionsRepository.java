package com.pvp.erpv.repository;

import com.pvp.erpv.models.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionsRepository extends JpaRepository<Question, Long> {
    List<Question> findAll();
}
