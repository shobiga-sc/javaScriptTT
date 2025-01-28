package com.trustrace.demo.service;
import com.trustrace.demo.dao.QuestionDAO;
import com.trustrace.demo.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionDAO questionDAO;

    public void addQuestion(Question question) {
        questionDAO.saveQuestion(question);
    }

    public List<Question> getQuestionsBySurveyId(String surveyId) {
        return questionDAO.getQuestionsBySurveyId(surveyId);
    }

}
