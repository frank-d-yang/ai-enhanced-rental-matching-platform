package run.frank.rentalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import run.frank.rentalapi.dto.LoginRequest;
import run.frank.rentalapi.dto.RegisterRequest;
import run.frank.rentalapi.entity.User;
import run.frank.rentalapi.mapper.UserMapper;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody RegisterRequest registerRequest) {
        HashMap<String, Object> response = new HashMap<>();

        User existingUser = userMapper.findByEmail(registerRequest.getEmail());
        if (existingUser != null) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setRole(registerRequest.getRole());

        userMapper.insertUser(user);

        response.put("success", true);
        response.put("message", "Register successful");
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        User user = userMapper.findByEmail(loginRequest.getEmail());

        if(user == null) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        if(!user.getPassword().equals(loginRequest.getPassword())) {
            response.put("success", false);
            response.put("message", "Password is incorrect");
            return response;
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("role", user.getRole());
        return response;
    }
}
