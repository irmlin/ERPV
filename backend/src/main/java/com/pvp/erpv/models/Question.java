package com.pvp.erpv.models;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String options;

    private String correctOption;

    private String explanation;

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getOptions() {
        return options;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public String getExplanation() {
        return explanation;
    }
}
