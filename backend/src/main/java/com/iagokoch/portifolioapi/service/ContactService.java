package com.iagokoch.portifolioapi.service;

import com.iagokoch.portifolioapi.ContactMessage;
import com.iagokoch.portifolioapi.ContactMessageRepository;
import com.iagokoch.portifolioapi.DTO.ContactRequest;
import com.iagokoch.portifolioapi.notification.ContactRegistered;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {
    private final ContactMessageRepository repository;

    private final ApplicationEventPublisher eventPublisher;

    public ContactService(ContactMessageRepository repository, ApplicationEventPublisher eventPublisher) {
        this.repository = repository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public void register(ContactRequest request) {
        if (isHoneypotFilled(request)) {
            return;
        }

        ContactMessage contactMessage = new ContactMessage(request.name(), request.email(), request.message());
        repository.save(contactMessage);

        ContactRegistered event = new ContactRegistered(
                contactMessage.getId(),
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getMessage(),
                contactMessage.getCreatedAt()
        );
        eventPublisher.publishEvent(event);

    }

    private boolean isHoneypotFilled(ContactRequest request) {
        return request.website() != null && !request.website().isBlank();
    }
}

