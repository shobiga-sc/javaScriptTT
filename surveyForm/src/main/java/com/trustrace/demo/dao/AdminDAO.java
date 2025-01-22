package com.trustrace.demo.dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.trustrace.demo.entity.Admin;

@Repository
public class AdminDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveAdmin(Admin admin) {
        mongoTemplate.save(admin);
    }

    public Optional<Admin> findByUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        return Optional.ofNullable(mongoTemplate.findOne(query, Admin.class));
    }
}
