package com.trustrace.demo.dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.trustrace.demo.entity.Response;
import com.trustrace.demo.entity.ResponseStatus;

@Repository
public class ResponseDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveResponse(Response response) {
        mongoTemplate.save(response);
    }

    public List<Response> getResponses(String surveyId, int page, int size) {
        Query query = new Query(Criteria.where("survey.id").is(surveyId))
                .with(PageRequest.of(page, size));
        return mongoTemplate.find(query, Response.class);
    }

    public Response updateResponseStatus(String responseId, ResponseStatus status) {
        Query query = new Query(Criteria.where("id").is(responseId));
        Response response = mongoTemplate.findOne(query, Response.class);
        if (response != null) {
            response.setStatus(status);
            mongoTemplate.save(response);
        }
        return response;
    }
}
