package com.pvp.erpv.controllers;

import com.pvp.erpv.service.QuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/questions")
public class QuestionsController {
    @Autowired
    QuestionsService questionsService;

    @GetMapping()
    public ResponseEntity<?> getQuestions() {
        return questionsService.getQuestions();
    }
}
