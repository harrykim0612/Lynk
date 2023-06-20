package com.lnk.lnkregister.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lnk.lnkregister.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUserEmailIgnoreCase(String emailId);
    User findByConfirmationToken(String confirmationToken);
    Long deleteByUserEmailIgnoreCase(String emailId);
    Boolean existsByUserEmail(String email);
}
