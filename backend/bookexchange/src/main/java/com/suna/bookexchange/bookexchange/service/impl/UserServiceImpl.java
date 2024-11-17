package com.suna.bookexchange.bookexchange.service.impl;

import com.suna.bookexchange.bookexchange.model.User;
import com.suna.bookexchange.bookexchange.model.dto.UserCreateDTO;
import com.suna.bookexchange.bookexchange.repository.UserRepository;
import com.suna.bookexchange.bookexchange.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);


    @Override
    public User createUser(UserCreateDTO dto) {
        // Check if a user with the same username or email already exists
        if (userRepository.existsById(dto.getUsername())) {
            throw new IllegalArgumentException("Username already exists.");
        }
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }

        // Create a new user and set the necessary fields
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        // Ensure the password is encrypted in a real-world scenario
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(dto.getPassword()));

        // Save the user to the database
        return userRepository.save(user);
    }

    @Override
    public String login(String username, String password) throws IllegalArgumentException {
        // Check if a user with the provided email exists
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (!existingUser.isPresent()) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        User user = existingUser.get();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // Validate password (assuming passwords are stored as hashed strings)
        if (!encoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        // If credentials are valid, generate a JWT token and return it
        return generateJwtToken(user);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    // A method to generate JWT Token (you can customize this as needed)
    private String generateJwtToken(User user) {
        // Logic to generate JWT (using a library like jjwt)
        String token = Jwts.builder()
                .setSubject(user.getUsername()) // Use the username as the subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Token expires in 1 hour
                .signWith(SECRET_KEY) // Use the secure key
                .compact();

        return token;
    }
}
