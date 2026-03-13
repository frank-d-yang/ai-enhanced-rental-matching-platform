package run.frank.rentalapi.service;

import run.frank.rentalapi.dto.AuthResponse;
import run.frank.rentalapi.dto.LoginRequest;
import run.frank.rentalapi.dto.RegisterRequest;

public interface AuthService {
    void register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);
}
