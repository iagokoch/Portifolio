package com.iagokoch.portifolioapi.notification;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class ContactNotificationListener {
    private final ContactNotificationDispatcher dispatcher;

    public ContactNotificationListener(
            ContactNotificationDispatcher dispatcher
    ) {
        this.dispatcher = dispatcher;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onContactRegistered(ContactRegistered event) {
        dispatcher.dispatch(event);
    }
}
