package com.trustrace.demo.dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.trustrace.demo.entity.Question;

@Repository
public class QuestionDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveQuestion(Question question) {
        mongoTemplate.save(question);
    }

    public List<Question> getQuestionsBySurveyId(String surveyId) {
        Query query = new Query(Criteria.where("survey.id").is(surveyId));
        return mongoTemplate.find(query, Question.class);
    }
}
