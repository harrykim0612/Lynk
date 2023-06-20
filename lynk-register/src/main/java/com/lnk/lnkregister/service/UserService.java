package com.lnk.lnkregister.service;

import org.springframework.http.ResponseEntity;

import com.lnk.lnkregister.entity.User;

public interface UserService {
    ResponseEntity<?> saveUser(User user);
    ResponseEntity<?> confirmEmail(String confirmationToken);
}
