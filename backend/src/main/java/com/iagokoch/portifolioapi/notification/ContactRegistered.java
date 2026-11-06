package com.iagokoch.portifolioapi.notification;

import java.time.Instant;
import java.util.UUID;

public record ContactRegistered( UUID id, String name, String email, String message, Instant createdAt) {

}
