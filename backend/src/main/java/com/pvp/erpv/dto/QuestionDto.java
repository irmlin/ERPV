package com.pvp.erpv.dto;

public record QuestionDto(String question, String[] options, String[] correctOption, String explanation, String pictureName) {
}
