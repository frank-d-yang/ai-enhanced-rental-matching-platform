package run.frank.rentalapi.service;

import run.frank.rentalapi.dto.LoginRequest;
import run.frank.rentalapi.dto.RegisterRequest;
import run.frank.rentalapi.entity.User;

public interface AuthService {
    void register(RegisterRequest registerRequest);

    User login(LoginRequest loginRequest);
}
