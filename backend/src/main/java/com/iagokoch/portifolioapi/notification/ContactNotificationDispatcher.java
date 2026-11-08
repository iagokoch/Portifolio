package com.iagokoch.portifolioapi.notification;

public interface ContactNotificationDispatcher {
    void dispatch(ContactRegistered event);
}
