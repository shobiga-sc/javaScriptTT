package com.trustrace.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.trustrace.demo.entity.Survey;

@Repository
public class SurveyDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveSurvey(Survey survey) {
        mongoTemplate.save(survey);
    }

    public List<Survey> getAllSurveys() {
        return mongoTemplate.findAll(Survey.class);
    }
}
