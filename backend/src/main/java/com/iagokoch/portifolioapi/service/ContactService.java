package com.iagokoch.portifolioapi.service;

import com.iagokoch.portifolioapi.ContactMessage;
import com.iagokoch.portifolioapi.ContactMessageRepository;
import com.iagokoch.portifolioapi.DTO.ContactRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService{
    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository){
        this.repository = repository; // construtor
    }

    //metodo register

    @Transactional
    public void register(ContactRequest request){

        ContactMessage contactMessage = new ContactMessage(request.name(), request.email(), request.message());
        repository.save(contactMessage);


    }
}
