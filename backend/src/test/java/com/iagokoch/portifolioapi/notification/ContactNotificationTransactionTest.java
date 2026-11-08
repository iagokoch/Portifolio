package com.iagokoch.portifolioapi.notification;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.AbstractPlatformTransactionManager;
import org.springframework.transaction.support.DefaultTransactionStatus;
import org.springframework.transaction.support.TransactionTemplate;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.Instant;
import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

@SpringJUnitConfig(ContactNotificationTransactionTest.Config.class)
public class ContactNotificationTransactionTest {

        @Autowired
        private ApplicationEventPublisher publisher;

        @Autowired
        private ContactNotificationDispatcher dispatcher;

        @Autowired
        private TransactionTemplate transactionTemplate;

        @BeforeEach
        void setUp() {
            reset(dispatcher);
        }

        @Test
        void shouldDispatchOnlyAfterCommit() {
            ContactRegistered event = new ContactRegistered(
                    UUID.randomUUID(),
                    "Contato de teste",
                    "teste@example.com",
                    "Mensagem de teste",
                    Instant.now()
            );
            transactionTemplate.executeWithoutResult(status -> {
                publisher.publishEvent(event);

                verifyNoInteractions(dispatcher);
            });
            verify(dispatcher).dispatch(event);
        }

        @Test
        void shouldNotDispatchAfterRollback() {
            ContactRegistered event = new ContactRegistered(
                    UUID.randomUUID(),
                    "Contato de teste1",
                    "teste1@example.com",
                    "Mensagem de teste1",
                    Instant.now()
            );
            transactionTemplate.executeWithoutResult(status -> {
                publisher.publishEvent(event);
                status.setRollbackOnly();
            });
            verifyNoInteractions(dispatcher);
        }

        @Test
        void shouldNotDispatchWithoutTransaction() {
            publisher.publishEvent(new ContactRegistered(
                    UUID.randomUUID(), "Teste", "teste@example.com", "Mensagem", Instant.now()
            ));
            verifyNoInteractions(dispatcher);
        }

        @Configuration
        @EnableTransactionManagement
        @Import(ContactNotificationListener.class)
        static class Config {
            @Bean
            ContactNotificationDispatcher dispatcher() {
                return mock(ContactNotificationDispatcher.class);
            }
            @Bean
            TransactionTemplate transactionTemplate() {
                return new TransactionTemplate(new TestTransactionManager());
            }
        }

        static class TestTransactionManager
            extends AbstractPlatformTransactionManager {
            @Override
            protected Object doGetTransaction() {
                return new Object();
            }

            @Override
            protected void doBegin(
                    Object transaction,
                    TransactionDefinition definition
            ) {}

            @Override
            protected void doCommit(DefaultTransactionStatus status) {}

            @Override
            protected void doRollback(DefaultTransactionStatus status) {}
        }

    }

