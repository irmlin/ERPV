package com.pvp.erpv.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pvp.erpv.dto.QuestionDto;
import com.pvp.erpv.models.Question;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class QuestionMapper {
    public List<QuestionDto> fromModelToDto(List<Question> question) {
        return question.stream()
            .map(q -> {
                try {
                    return new QuestionDto(
                        q.getQuestion(),
                        jsonStringToArray(q.getOptions()),
                        jsonStringToArray(q.getCorrectOption()),
                        q.getExplanation(),
                        q.getPictureName());
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            })
            .collect(Collectors.toList());
    }

    String[] jsonStringToArray(String str) throws JsonProcessingException {
        String[] arr = str.replace("{", "").replace("}", "").split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");

        for (int i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replaceAll("^\"|\"$", "");
        }

        return arr;
    }
}
