package com.iagokoch.portifolioapi.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record ContactRequest(
        @Size (max = 100)
        @NotBlank(message = "Informe o seu nome.")
        String name,

        @Size (max = 254)
        @NotBlank(message = "Informe o seu e-mail.")
        @Email(message = "E-mail inválido.")
        String email,

        @Size(max = 2000)
        @NotBlank(message = "O campo mensagem não pode ser vazio!")
        String message

) {}