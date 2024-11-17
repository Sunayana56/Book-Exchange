package com.suna.bookexchange.bookexchange.service;

import com.suna.bookexchange.bookexchange.model.User;
import com.suna.bookexchange.bookexchange.model.dto.UserCreateDTO;

public interface UserService {

    public User createUser(UserCreateDTO userCreateDTO);

    public String login(String email, String password);

    public User getUserByUsername(String username);
}
