package com.trustrace.demo.dao;

import com.trustrace.demo.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Role saveRole(Role role) {
              return mongoTemplate.save(role);
    }

}
