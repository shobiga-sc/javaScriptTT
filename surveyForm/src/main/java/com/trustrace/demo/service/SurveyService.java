package com.trustrace.demo.service;
import com.trustrace.demo.dao.SurveyDAO;
import com.trustrace.demo.entity.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SurveyService {
    @Autowired
    private SurveyDAO surveyDAO;

    public void createSurvey(Survey survey) {
        surveyDAO.saveSurvey(survey);
    }

    public List<Survey> getAllSurveys() {
        return surveyDAO.getAllSurveys();
    }
}

