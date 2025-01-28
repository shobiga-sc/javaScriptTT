package com.trustrace.demo.service;
import com.trustrace.demo.entity.Role;
import com.trustrace.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.trustrace.demo.dao.UserDAO;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MongoTemplate mongoTemplate;


        public void register(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        Role defaultRole = new Role();
        defaultRole.setName("ROLE_ENDUSER");
        user.addRole(defaultRole);
        userDAO.saveUser(user);}

//public void register(String username, String password, Set<String> roleNames) {
//    User user = new User();
//    user.setUsername(username);
//    user.setPassword(passwordEncoder.encode(password));
//
//    // Fetch roles from the database
//    Set<Role> roles = new HashSet<>();
//    for (String roleName : roleNames) {
//        Role role = mongoTemplate.findOne(
//                Query.query(Criteria.where("name").is(roleName)), Role.class
//        );
//        if (role != null) {
//            roles.add(role);
//        } else {
//            throw new RuntimeException("Role not found: " + roleName);
//        }
//    }
//
//    user.setRoles(roles);
//    userDAO.saveUser(user);
//}

    public User authenticate(String username, String password) {
        Optional<User> Opt = userDAO.findByUsername(username);
        if (Opt.isPresent() && passwordEncoder.matches(password, Opt.get().getPassword())) {
            return Opt.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
    public void deleteUser(String id) {
        userDAO.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userDAO.findAllUsers();
    }

    public Optional<User> getUserById(String id) {
        return userDAO.findUserById(id);
    }
}
