package com.iagokoch.portifolioapi.notification;

import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.util.Map;

final class TelegramNotificationSender implements ContactNotificationSender {
    private final RestClient client;
    private final String botToken;
    private final String chatId;

    TelegramNotificationSender(RestClient client, String botToken, String chatId) {
        this.client = client;
        this.botToken = botToken;
        this.chatId = chatId;
    }

    @Override
    public void send(ContactRegistered contact) {
        String text = """
                Novo contato no portfólio
                ID: %s
                Data (UTC): %s
                Nome: %s
                E-mail: %s

                %s
                """.formatted(contact.id(), contact.createdAt(), contact.name(), contact.email(), contact.message());
        // DTO limits keep the complete message below Telegram's 4096 character limit.
        Map<?, ?> response = client.post().uri("/bot{token}/sendMessage", botToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("chat_id", chatId, "text", text,
                        "link_preview_options", Map.of("is_disabled", true)))
                .retrieve().body(Map.class);
        if (response == null || !Boolean.TRUE.equals(response.get("ok"))) {
            throw new IllegalStateException("Telegram rejected notification");
        }
    }
}
