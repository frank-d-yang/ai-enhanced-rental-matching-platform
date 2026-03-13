package run.frank.rentalapi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import run.frank.rentalapi.mapper.UserMapper;
import run.frank.rentalapi.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


}
