package com.trustrace.demo.service;
import com.trustrace.demo.dao.ResponseDAO;
import com.trustrace.demo.entity.Response;
import com.trustrace.demo.entity.ResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResponseService {
    @Autowired
    private ResponseDAO responseDAO;

    public void submitResponse(Response response) {
        responseDAO.saveResponse(response);
    }

    public List<Response> getSurveyResponses(String surveyId, int page, int size) {
        return responseDAO.getResponses(surveyId, page, size);
    }

    public Response updateResponseStatus(String responseId, ResponseStatus status) {
        return responseDAO.updateResponseStatus(responseId, status);
    }
}
