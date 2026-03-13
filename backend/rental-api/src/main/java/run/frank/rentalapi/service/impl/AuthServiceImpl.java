package run.frank.rentalapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.dto.AuthResponse;
import run.frank.rentalapi.dto.LoginRequest;
import run.frank.rentalapi.dto.RegisterRequest;
import run.frank.rentalapi.entity.User;
import run.frank.rentalapi.exception.BusinessException;
import run.frank.rentalapi.mapper.UserMapper;
import run.frank.rentalapi.security.JwtUtil;
import run.frank.rentalapi.service.AuthService;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void register(RegisterRequest registerRequest) {
        LambdaQueryWrapper<User> emailWrapper = new LambdaQueryWrapper<>();
        emailWrapper.eq(User::getEmail, registerRequest.getEmail());
        User existingEmailUser = userMapper.selectOne(emailWrapper);
        if (existingEmailUser != null) {
            throw new BusinessException("Email already exists");
        }

        LambdaQueryWrapper<User> usernameWrapper = new LambdaQueryWrapper<>();
        usernameWrapper.eq(User::getUsername, registerRequest.getUsername());
        User existingUsernameUser = userMapper.selectOne(usernameWrapper);
        if (existingUsernameUser != null) {
            throw new BusinessException("Username already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole() == null || registerRequest.getRole().isBlank()
                ? "TENANT"
                : registerRequest.getRole());
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userMapper.insert(user);
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getEmail, loginRequest.getEmail());
        User user = userMapper.selectOne(wrapper);

        if(user == null) {
            throw new BusinessException("User not found");
        }

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new BusinessException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRole());

        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }
}
