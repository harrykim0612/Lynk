package com.lnk.lnklogin.service;

import org.springframework.http.ResponseEntity;

import com.lnk.lnklogin.entity.User;

public interface UserService {
    ResponseEntity<?> userLogin(User user);
}
