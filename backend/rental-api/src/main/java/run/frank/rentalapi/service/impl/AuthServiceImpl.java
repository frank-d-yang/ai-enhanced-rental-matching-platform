package run.frank.rentalapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.dto.LoginRequest;
import run.frank.rentalapi.dto.RegisterRequest;
import run.frank.rentalapi.entity.User;
import run.frank.rentalapi.mapper.UserMapper;
import run.frank.rentalapi.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void register(RegisterRequest registerRequest) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getEmail, registerRequest.getEmail());

        User existingUser = userMapper.selectOne(wrapper);
        if (existingUser != null) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(registerRequest.getPassword());
        user.setRole(registerRequest.getRole());

        userMapper.insert(user);
    }

    @Override
    public User login(LoginRequest loginRequest) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getEmail, loginRequest.getEmail());
        User user = userMapper.selectOne(wrapper);

        if(user == null) {
            throw new RuntimeException("User not found");
        }

        if(!user.getPasswordHash().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Password is incorrect");
        }
        return user;
    }
}
