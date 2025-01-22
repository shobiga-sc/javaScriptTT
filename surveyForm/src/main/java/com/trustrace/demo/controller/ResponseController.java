package com.trustrace.demo.controller;
import com.trustrace.demo.entity.Response;
import com.trustrace.demo.entity.ResponseStatus;
import com.trustrace.demo.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {
    @Autowired
    private ResponseService responseService;

    @PostMapping
    public ResponseEntity<String> submitResponse(@RequestBody Response response) {
        responseService.submitResponse(response);
        return ResponseEntity.ok("Response submitted successfully.");
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<List<Response>> getSurveyResponses(
            @PathVariable String surveyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(responseService.getSurveyResponses(surveyId, page, size));
    }

    @PatchMapping("/{responseId}/status")
    public ResponseEntity<Response> updateResponseStatus(
            @PathVariable String responseId,
            @RequestParam ResponseStatus status) {
        return ResponseEntity.ok(responseService.updateResponseStatus(responseId, status));
    }
}
