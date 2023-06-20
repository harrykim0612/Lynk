package com.lnk.lnklogin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lnk.lnklogin.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUserEmailIgnoreCase(String emailId);
    // String getUserPassword(String emailId);
    Boolean existsByUserEmail(String email);
}
