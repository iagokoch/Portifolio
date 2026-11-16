package com.iagokoch.portifolioapi.notification;

import com.iagokoch.portifolioapi.notification.AsyncContactNotificationDispatcher.Channel;
import com.iagokoch.portifolioapi.notification.AsyncContactNotificationDispatcher.Failure;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationFailureReporterTest {
    @Mock
    private NotificationFailureReporter.AlertSender alertSender;

    private final UUID anyContactId = UUID.randomUUID();

    @Test
    void shouldNotSendAlertWhenDiscordDisabled() throws Exception {
        var reporter = new NotificationFailureReporter(
                false,
                Runnable::run,
                alertSender
        );

        Channel anyChannel = Channel.EMAIL;
        Failure anyFailure = Failure.SEND_FAILED;

        reporter.report(anyContactId, anyChannel, anyFailure);
        verifyNoInteractions(alertSender);
    }

    @Test
    void shouldSendAlertWhenDiscordEnabled() throws Exception {
        var reporter = new NotificationFailureReporter(
                true,
                Runnable::run,
                alertSender
        );

        Channel anyChannel = Channel.TELEGRAM;
        Failure anyFailure = Failure.SEND_FAILED;

        reporter.report(anyContactId, anyChannel, anyFailure);
        verify(alertSender).send(anyContactId, anyChannel, anyFailure);
    }

    @Test
    void shouldNotPropagateExceptionWhenAlertSenderFails() throws Exception {
        var reporter = new NotificationFailureReporter(
                true,
                Runnable::run,
                alertSender
        );

        Channel anyChannel = Channel.EMAIL;
        Failure anyFailure = Failure.SEND_FAILED;

        doThrow(new RuntimeException("Falha simulada"))
                .when(alertSender)
                .send(anyContactId,anyChannel, anyFailure);

        assertDoesNotThrow(() ->
                reporter.report(anyContactId, anyChannel, anyFailure));
    }

}
