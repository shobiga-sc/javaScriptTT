package com.trustrace.demo.controller;
import com.trustrace.demo.entity.Admin;
import com.trustrace.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Admin admin) {
        adminService.registerAdmin(admin.getUsername(), admin.getPassword());
        return ResponseEntity.ok("Admin registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        adminService.authenticate(admin.getUsername(), admin.getPassword());
        return ResponseEntity.ok("Login successful.");
    }
}

