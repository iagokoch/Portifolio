package com.iagokoch.portifolioapi.notification;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

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

}
