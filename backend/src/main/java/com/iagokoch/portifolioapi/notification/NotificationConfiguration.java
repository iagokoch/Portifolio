package com.iagokoch.portifolioapi.notification;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.client.RestClient;

import java.net.http.HttpClient;
import java.util.List;

@Configuration
@EnableConfigurationProperties(NotificationProperties.class)
public class NotificationConfiguration {

    private ThreadPoolTaskExecutor notificationExecutor(String prefix,
                                                        int workers,
                                                        int queueCapacity) {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        executor.setThreadNamePrefix(prefix);
        executor.setCorePoolSize(workers);
        executor.setMaxPoolSize(workers);
        executor.setQueueCapacity(queueCapacity);

        return executor;
    }

    @Bean
    public ThreadPoolTaskExecutor emailNotificationExecutor(NotificationProperties properties) {
        return notificationExecutor(
                "contact-email-",
                properties.email().workers(),
                properties.email().queueCapacity()
        );
    }

    @Bean
    public ThreadPoolTaskExecutor telegramNotificationExecutor(NotificationProperties properties) {
        return notificationExecutor(
                "contact-telegram-",
                properties.telegram().workers(),
                properties.telegram().queueCapacity()
        );
    }

    @Bean
    public ThreadPoolTaskExecutor discordAlertExecutor(NotificationProperties properties) {
        return notificationExecutor(
                "contact-discord-",
                1,
                properties.discord().queueCapacity()
        );
    }

    @Bean
    public JdkClientHttpRequestFactory notificationRequestFactory(NotificationProperties properties) {
        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(properties.connectTimeout())
                .build();

        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(client);
        factory.setReadTimeout(properties.requestTimeout());
        return factory;
    }

    @Bean
    public TelegramNotificationSender telegramNotificationSender(NotificationProperties properties, JdkClientHttpRequestFactory notificationRequestFactory) {
        RestClient client = RestClient.builder().requestFactory(notificationRequestFactory)
                .baseUrl("https://api.telegram.org").build();


        TelegramNotificationSender sender = new TelegramNotificationSender(client,
                properties.telegram().botToken(),
                properties.telegram().chatId());


        return sender;
    }

    @Bean
    public NotificationFailureReporter notificationFailureReporter(NotificationProperties properties,
                                                                   JdkClientHttpRequestFactory notificationRequestFactory,
                                                                   @Qualifier("discordAlertExecutor") ThreadPoolTaskExecutor executor) {
        var discord = properties.discord();

        if (!discord.enabled()) {
            return new NotificationFailureReporter(false, executor, null);
        }
        RestClient client = RestClient.builder()
                .requestFactory(notificationRequestFactory)
                .build();

        return new NotificationFailureReporter(
                true, executor, new DiscordAlertSender(client, discord.webhookUrl())
        );
    }

    @Bean
    public EmailNotificationSender emailNotificationSender(
            NotificationProperties properties,
            JavaMailSender mailSender
    ){
        EmailNotificationSender emailNotificationSender = new EmailNotificationSender(mailSender, properties.email().from(), properties.email().to());

        return emailNotificationSender;
    }

    @Bean
    public ContactNotificationDispatcher contactNotificationDispatcher(NotificationProperties properties,
                                                                       EmailNotificationSender emailNotificationSender,
                                                                       TelegramNotificationSender telegramNotificationSender,
                                                                       NotificationFailureReporter notificationFailureReporter,
                                                                       @Qualifier("emailNotificationExecutor") ThreadPoolTaskExecutor executorEmail,
                                                                       @Qualifier("telegramNotificationExecutor") ThreadPoolTaskExecutor executorTelegram) {
        AsyncContactNotificationDispatcher.Delivery emailDelivery =
                new AsyncContactNotificationDispatcher.Delivery(
                        AsyncContactNotificationDispatcher.Channel.EMAIL,
                        properties.email().enabled(),
                        executorEmail,
                        emailNotificationSender
                );
        AsyncContactNotificationDispatcher.Delivery telegramDelivery =
                new AsyncContactNotificationDispatcher.Delivery(
                        AsyncContactNotificationDispatcher.Channel.TELEGRAM,
                        properties.telegram().enabled(),
                        executorTelegram,
                        telegramNotificationSender
                );

        return new AsyncContactNotificationDispatcher(List.of(emailDelivery, telegramDelivery),
                notificationFailureReporter);
    }

}
