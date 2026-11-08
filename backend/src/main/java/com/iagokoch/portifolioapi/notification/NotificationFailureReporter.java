package com.iagokoch.portifolioapi.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;
import java.util.concurrent.Executor;
import java.util.concurrent.RejectedExecutionException;

import static com.iagokoch.portifolioapi.notification.AsyncContactNotificationDispatcher.*;

final class NotificationFailureReporter {
    private static final Logger log = LoggerFactory.getLogger(NotificationFailureReporter.class);

    @FunctionalInterface
    interface AlertSender {
        void send(UUID contactId, Channel channel, Failure failure) throws Exception;
    }

    private final boolean enabled;
    private final Executor executor;
    private final AlertSender sender;

    NotificationFailureReporter(boolean enabled, Executor executor, AlertSender sender) {
        this.enabled = enabled;
        this.executor = executor;
        this.sender = sender;
    }

    void report(UUID contactId, Channel channel, Failure failure) {
        log.warn("Contact notification failed: contactId={} channel={} reason={}", contactId, channel, failure);
        if (!enabled) {
            return;
        }
        try {
            executor.execute(() -> {
                try {
                    sender.send(contactId, channel, failure);
                } catch (Exception ignored) {
                    if (ignored instanceof InterruptedException) {
                        Thread.currentThread().interrupt();
                    }
                    log.warn("Discord alert failed: contactId={} channel={}", contactId, channel);
                }
            });
        } catch (RejectedExecutionException ignored) {
            log.warn("Discord alert queue rejected: contactId={} channel={}", contactId, channel);
        }
    }
}
