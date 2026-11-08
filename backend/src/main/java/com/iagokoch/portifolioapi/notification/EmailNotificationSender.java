package com.iagokoch.portifolioapi.notification;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

final class EmailNotificationSender implements ContactNotificationSender {
    private final JavaMailSender sender;
    private final String from;
    private final String to;

    EmailNotificationSender(JavaMailSender sender, String from, String to) {
        this.sender = sender;
        this.from = from;
        this.to = to;
    }

    @Override
    public void send(ContactRegistered contact) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setReplyTo(contact.email());
        mail.setSubject("Novo contato no portfólio · " + contact.id());
        mail.setText("""
                Novo contato no portfólio
                ID: %s
                Data (UTC): %s
                Nome: %s
                E-mail: %s

                %s
                """.formatted(contact.id(), contact.createdAt(), contact.name(), contact.email(), contact.message()));
        sender.send(mail);
    }
}
