package com.lnk.lnklogin.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail;
    private String userPassword;
    private boolean isEnabled;

    @Column(name = "confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    public User() {
        createdDate = LocalDateTime.now();
        confirmationToken = UUID.randomUUID().toString();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long userId) {
        this.id = userId;
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return this.userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public boolean isIsEnabled() {
        return this.isEnabled;
    }

    public boolean getIsEnabled() {
        return this.isEnabled;
    }

    public void setEnabled(boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    public String getConfirmationToken() {
        return this.confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public LocalDateTime getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "{" +
            " userId='" + getId() + "'" +
            ", userEmail='" + getUserEmail() + "'" +
            ", userPassword='" + getUserPassword() + "'" +
            ", isEnabled='" + isIsEnabled() + "'" +
            ", confirmationToken='" + getConfirmationToken() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }

}
