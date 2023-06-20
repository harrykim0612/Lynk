package com.lnk.lnklogin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lnk.lnklogin.entity.User;
import com.lnk.lnklogin.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> userLogin(User user) {
        if (userRepository.existsByUserEmail(user.getUserEmail()) && userRepository.findByUserEmailIgnoreCase(user.getUserEmail()).isIsEnabled()) {
            if (passwordEncoder.matches(user.getUserPassword(), userRepository.findByUserEmailIgnoreCase(user.getUserEmail()).getUserPassword())) {
                System.out.println("Login successful");
                return ResponseEntity.ok(userRepository.findByUserEmailIgnoreCase(user.getUserEmail()));
            }
            else {
                return ResponseEntity.badRequest().body("Password does not match");
            }
        }
        else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }
}
