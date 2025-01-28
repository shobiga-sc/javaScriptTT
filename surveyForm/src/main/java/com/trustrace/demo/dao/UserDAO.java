package com.trustrace.demo.dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.trustrace.demo.entity.User;

import java.util.List;

@Repository
public class UserDAO {

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final String COLLECTION_NAME = "users";




    public void saveUser(User user) {
        mongoTemplate.save(user);
    }

    public Optional<User> findByUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        return Optional.ofNullable(mongoTemplate.findOne(query, User.class));
    }

    // Find user by ID
    public Optional<User> findUserById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        return Optional.ofNullable(mongoTemplate.findOne(query, User.class, COLLECTION_NAME));
    }

    // Delete user by ID
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        mongoTemplate.remove(query, User.class, COLLECTION_NAME);
    }

    // Get all users
    public List<User> findAllUsers() {
        return mongoTemplate.findAll(User.class, COLLECTION_NAME);
    }
}
