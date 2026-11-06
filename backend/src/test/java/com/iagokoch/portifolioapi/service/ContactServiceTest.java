package com.iagokoch.portifolioapi.service;

import com.iagokoch.portifolioapi.ContactMessageRepository;
import com.iagokoch.portifolioapi.DTO.ContactRequest;
import com.iagokoch.portifolioapi.notification.ContactRegistered;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static  org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {
    @Mock
    private ContactMessageRepository repository;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private ContactService service;

    @Captor
    private ArgumentCaptor<ContactRegistered> eventCaptor;

    @Test
    void shouldNotSaveWhenHoneypotIsFilled() {
        ContactRequest request = new ContactRequest("Iago", "iago@example.com", "Olá", "https://spam.com");

        service.register(request);

        verify(repository, never()).save(any());
        verifyNoInteractions(eventPublisher);
    }

    @Test
    void shouldSaveAndPublishEventWhenHoneypotIsEmpty() {
        ContactRequest request = new ContactRequest("iago1", "iago1@example.com", "ola 1", "");

        service.register(request);

        InOrder exexutionOrder = inOrder(repository, eventPublisher);
        exexutionOrder.verify(repository).save(any());
        exexutionOrder.verify(eventPublisher).publishEvent(eventCaptor.capture());

        ContactRegistered event = eventCaptor.getValue();

        assertEquals(request.name(), event.name());
        assertEquals(request.email(), event.email());
        assertEquals(request.message(), event.message());
    }

    @Test
    void shouldNotPublishEventWhenSaveFails() {

        ContactRequest request = new ContactRequest(
                "Iago",
                "iago@example.com",
                "Olá",
                ""
        );

        when(repository.save(any()))
                .thenThrow(new IllegalStateException("Falha simulada"));

        assertThrows(IllegalStateException.class, () -> service.register(request));
        verifyNoInteractions(eventPublisher);
    }

}