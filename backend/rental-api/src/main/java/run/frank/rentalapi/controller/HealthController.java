package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import run.frank.rentalapi.entity.User;
import run.frank.rentalapi.mapper.UserMapper;

import java.util.List;

@RestController
public class HealthController {

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userMapper.findAll();
    }

}
