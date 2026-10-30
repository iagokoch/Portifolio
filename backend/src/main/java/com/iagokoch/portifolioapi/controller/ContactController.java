package com.iagokoch.portifolioapi.controller;

import com.iagokoch.portifolioapi.DTO.ContactRequest;
import com.iagokoch.portifolioapi.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService service;

    public ContactController(ContactService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> send(
            @Valid @RequestBody ContactRequest request
            ) {
        service.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
