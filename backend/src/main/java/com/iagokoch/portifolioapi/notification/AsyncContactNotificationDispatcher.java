package com.iagokoch.portifolioapi.notification;

import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.RejectedExecutionException;

final class AsyncContactNotificationDispatcher implements ContactNotificationDispatcher {
    enum Channel { EMAIL, TELEGRAM }
    enum Failure { SEND_FAILED, QUEUE_REJECTED }

    record Delivery(Channel channel, boolean enabled, Executor executor, ContactNotificationSender sender) {}

    private final List<Delivery> deliveries;
    private final NotificationFailureReporter failures;

    AsyncContactNotificationDispatcher(List<Delivery> deliveries, NotificationFailureReporter failures) {
        this.deliveries = List.copyOf(deliveries);
        this.failures = failures;
    }

    @Override
    public void dispatch(ContactRegistered contact) {
        for (Delivery delivery : deliveries) {
            if (!delivery.enabled()) {
                continue;
            }
            try {
                delivery.executor().execute(() -> send(delivery, contact));
            } catch (RejectedExecutionException ignored) {
                failures.report(contact.id(), delivery.channel(), Failure.QUEUE_REJECTED);
            }
        }
    }

    private void send(Delivery delivery, ContactRegistered contact) {
        try {
            delivery.sender().send(contact);
        } catch (Exception ignored) {
            if (ignored instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            // Provider exceptions may contain credentials, addresses or the submitted message.
            failures.report(contact.id(), delivery.channel(), Failure.SEND_FAILED);
        }
    }
}
