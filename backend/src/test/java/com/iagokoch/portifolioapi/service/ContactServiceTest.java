package com.iagokoch.portifolioapi.service;

import com.iagokoch.portifolioapi.ContactMessageRepository;
import com.iagokoch.portifolioapi.DTO.ContactRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {
    @Mock
    private ContactMessageRepository repository;

    @InjectMocks
    private ContactService service;

    @Test
    void shouldNotSaveWhenHoneypotIsFilled() {
        ContactRequest request = new ContactRequest("Iago", "iago@example.com", "Olá", "https://spam.com");

        service.register(request);

        verify(repository, never()).save(any());
    }

    @Test
    void shouldSaveWhenHoneypotIsEmpty() {
        ContactRequest request = new ContactRequest("iago1", "iago1@example.com", "ola 1", "");

        service.register(request);

        verify(repository).save(any());
    }
}