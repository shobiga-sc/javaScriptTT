package com.trustrace.demo.controller;

import com.trustrace.demo.dao.RoleDAO;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import com.trustrace.demo.entity.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleDAO roleDAO;


    @PostMapping("/create")
    public Role createRole(@RequestBody Role role) {

        return roleDAO.saveRole(role);
    }
}
