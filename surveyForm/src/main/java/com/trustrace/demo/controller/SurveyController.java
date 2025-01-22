package com.trustrace.demo.controller;
import com.trustrace.demo.entity.Survey;
import com.trustrace.demo.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {
    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity<String> createSurvey(@RequestBody Survey survey) {
        surveyService.createSurvey(survey);
        return ResponseEntity.ok("Survey created successfully.");
    }

    @GetMapping
    public ResponseEntity<List<Survey>> getAllSurveys() {
        return ResponseEntity.ok(surveyService.getAllSurveys());
    }
}
