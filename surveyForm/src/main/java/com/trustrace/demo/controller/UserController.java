package com.trustrace.demo.controller;
import com.trustrace.demo.entity.User;
import com.trustrace.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user.getUsername(), user.getPassword());
        return ResponseEntity.ok("User registered successfully.");
    }

//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> payload) {
//        String username = (String) payload.get("username");
//        String password = (String) payload.get("password");
//        List<String> roleNames = (List<String>) payload.get("roles");
//
//        Set<String> roleNameSet = new HashSet<>(roleNames);
//        userService.register(username, password, roleNameSet);
//
//        return ResponseEntity.ok("User registered successfully");
//    }




    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
       userService.authenticate(user.getUsername(), user.getPassword());
        return ResponseEntity.ok("Login successful.");
    }
}

