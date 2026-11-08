package com.iagokoch.portifolioapi.notification;

@FunctionalInterface
interface ContactNotificationSender {
    void send(ContactRegistered contact) throws Exception;
}
