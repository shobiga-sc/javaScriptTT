package com.trustrace.demo.service;
import com.trustrace.demo.dao.AdminDAO;
import com.trustrace.demo.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
public class AdminService {
    @Autowired
    private AdminDAO adminDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerAdmin(String username, String password) {
        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(password));
        adminDAO.saveAdmin(admin);
    }

    public Admin authenticate(String username, String password) {
        Optional<Admin> adminOpt = adminDAO.findByUsername(username);
        if (adminOpt.isPresent() && passwordEncoder.matches(password, adminOpt.get().getPassword())) {
            return adminOpt.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
}
