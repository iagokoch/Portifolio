package com.iagokoch.portifolioapi.notification;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties("app.notifications")
public record NotificationProperties(
        Duration connectTimeout, Duration requestTimeout,
        Email email, Telegram telegram, Discord discord
) {
    public record Email(boolean enabled, String from, String to, int workers, int queueCapacity) {}
    public record Telegram(boolean enabled, String botToken, String chatId, int workers, int queueCapacity) {
        @Override
        public String toString() {
            return "Telegram[enabled=" + enabled + ", credentials=REDACTED]";
        }
    }
    public record Discord(boolean enabled, String webhookUrl, int queueCapacity) {
        @Override
        public String toString() {
            return "Discord[enabled=" + enabled + ", webhookUrl=REDACTED]";
        }
    }
}
