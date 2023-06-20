package com.lnk.lnkregister.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lnk.lnkregister.entity.User;
import com.lnk.lnkregister.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> saveUser(User user) {
        if (userRepository.existsByUserEmail(user.getUserEmail())) {
            if (userRepository.findByUserEmailIgnoreCase(user.getUserEmail()).getIsEnabled()) {
                System.out.println("Email already in use");
                return ResponseEntity.badRequest().body("Email is already in use");
            }
            else {
                System.out.println("Delete by email");
                userRepository.deleteByUserEmailIgnoreCase(user.getUserEmail());
            }
        }

        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        userRepository.save(user);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getUserEmail());
        mailMessage.setSubject("[lnk] Complete Registration!");
        mailMessage.setText("To confirm your account, please click here: "
                +"http://localhost:8080/confirm-account?token="+user.getConfirmationToken());
        emailService.sendEmail(mailMessage);

        System.out.println("Confirmation Token: " + user.getConfirmationToken());

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        String token = userRepository.findByConfirmationToken(confirmationToken).getConfirmationToken();

        if(token != null)
        {
            User user = userRepository.findByConfirmationToken(token);
            user.setEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!\n"
            +"Please log in here: " + "http://localhost:3000/");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }
    
}
