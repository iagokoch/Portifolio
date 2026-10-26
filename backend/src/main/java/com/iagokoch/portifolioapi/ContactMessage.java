package com.iagokoch.portifolioapi;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "contact_message")
public class ContactMessage {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name ;
    @Column(nullable = false, length = 254)
    private String email;
    @Column(nullable = false)
    private String message;
    @Column (nullable = false, updatable = false, name = "created_at")
    private Instant createdAt;

    @PrePersist
    void defineHorarioCriacao(){
        this.createdAt = Instant.now();
    }

}
