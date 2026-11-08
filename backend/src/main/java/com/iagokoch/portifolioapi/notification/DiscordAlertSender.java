package com.iagokoch.portifolioapi.notification;

import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.iagokoch.portifolioapi.notification.AsyncContactNotificationDispatcher.*;

final class DiscordAlertSender implements NotificationFailureReporter.AlertSender {
    private final RestClient client;
    private final URI webhook;

    DiscordAlertSender(RestClient client, String webhookUrl) {
        this.client = client;
        this.webhook = URI.create(webhookUrl);
    }

    @Override
    public void send(UUID contactId, Channel channel, Failure failure) {
        String separator = webhook.getQuery() == null ? "?" : "&";
        client.post().uri(URI.create(webhook + separator + "wait=true"))
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("content", "Falha na notificação do portfólio. ID: " + contactId
                                + " | canal: " + channel + " | motivo: " + failure,
                        "allowed_mentions", Map.of("parse", List.of())))
                .retrieve().toBodilessEntity();
    }
}
