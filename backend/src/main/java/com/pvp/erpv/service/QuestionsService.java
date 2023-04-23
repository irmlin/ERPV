package com.pvp.erpv.service;

import com.pvp.erpv.mapper.QuestionMapper;
import com.pvp.erpv.models.Question;
import com.pvp.erpv.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionsService {
    @Autowired
    QuestionsRepository questionsRepository;

    @Autowired
    QuestionMapper questionMapper;

    public ResponseEntity<?> getQuestions() {
        List<Question> questionsData = questionsRepository.findAll();

        if (!questionsData.isEmpty()) {
            return new ResponseEntity<>(questionMapper.fromModelToDto(questionsData), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
