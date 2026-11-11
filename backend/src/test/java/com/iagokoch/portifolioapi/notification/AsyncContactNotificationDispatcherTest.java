package com.iagokoch.portifolioapi.notification;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AsyncContactNotificationDispatcherTest {
    @Mock
    private ContactNotificationSender emailSender;

    @Mock
    private ContactNotificationSender telegramSender;

    @Mock
    private NotificationFailureReporter failureReporter;

    @Test
    void shouldSendTelegramAndReportFailureWhenEmailFails() throws Exception {
        doThrow(new RuntimeException("Erro ao enviar e-mail"))
                .when(emailSender)
                .send(any());

        var emailDelivery = new AsyncContactNotificationDispatcher.Delivery(
                AsyncContactNotificationDispatcher.Channel.EMAIL,
                true,
                Runnable::run,
                emailSender
        );

        var telegramDelivery = new AsyncContactNotificationDispatcher.Delivery(
                AsyncContactNotificationDispatcher.Channel.TELEGRAM,
                true,
                Runnable::run,
                telegramSender
        );

        var dispatcher = new AsyncContactNotificationDispatcher(
                List.of(emailDelivery, telegramDelivery),
                failureReporter
        );

        ContactRegistered event = new ContactRegistered(
                UUID.randomUUID(),
                "Contato de teste",
                "teste@example.com",
                "Mensagem de teste",
                Instant.now()
        );

        dispatcher.dispatch(event);
        verify(emailSender).send(event);
        verify(telegramSender).send(event);
        verify(failureReporter).report(
                event.id(),
                AsyncContactNotificationDispatcher.Channel.EMAIL,
                AsyncContactNotificationDispatcher.Failure.SEND_FAILED
        );
    }

    @Test
    void shouldSendEmailAndReportFailureWhenTelegramFails() throws Exception {
        doThrow(new RuntimeException("Erro ao enviar mensagem no telegram"))
                .when(telegramSender)
                .send(any());

        var telegraDelivery = new AsyncContactNotificationDispatcher.Delivery(
                AsyncContactNotificationDispatcher.Channel.TELEGRAM,
                true,
                Runnable::run,
                telegramSender
        );

        var emailDelivery = new AsyncContactNotificationDispatcher.Delivery(
                AsyncContactNotificationDispatcher.Channel.EMAIL,
                true,
                Runnable::run,
                emailSender
        );

        var dispatcher = new AsyncContactNotificationDispatcher(
                List.of(telegraDelivery, emailDelivery),
                failureReporter
        );

        ContactRegistered event = new ContactRegistered(
                UUID.randomUUID(),
                "Teste Erro telegram",
                "errotelegram@example.com",
                "Mensagem de teste telegram",
                Instant.now()
        );

        dispatcher.dispatch(event);
        verify(emailSender).send(event);
        verify(telegramSender).send(event);
        verify(failureReporter).report(
            event.id(),
                AsyncContactNotificationDispatcher.Channel.TELEGRAM,
                AsyncContactNotificationDispatcher.Failure.SEND_FAILED
        );
    }

    @Test
    void shouldSkipDisabledChannel() {

        var emailDelivery = new AsyncContactNotificationDispatcher.Delivery(
                AsyncContactNotificationDispatcher.Channel.EMAIL,
                false,
                Runnable::run,
                emailSender
        );

        ContactRegistered event = new ContactRegistered(
                UUID.randomUUID(),
                "Canal vazio",
                "canavazio@example.com",
                "mensagem teste canal vazio",
                Instant.now()
        );

        var dispatcher = new AsyncContactNotificationDispatcher(
                List.of(emailDelivery),
                failureReporter
        );

        dispatcher.dispatch(event);
        verifyNoInteractions(emailSender, failureReporter);

    }
}
