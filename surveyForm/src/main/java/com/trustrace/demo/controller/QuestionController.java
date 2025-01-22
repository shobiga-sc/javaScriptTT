package com.trustrace.demo.controller;
import com.trustrace.demo.entity.Question;
import com.trustrace.demo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @PostMapping
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        questionService.addQuestion(question);
        return ResponseEntity.ok("Question added successfully.");
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable String surveyId) {
        return ResponseEntity.ok(questionService.getQuestionsBySurveyId(surveyId));
    }
}
