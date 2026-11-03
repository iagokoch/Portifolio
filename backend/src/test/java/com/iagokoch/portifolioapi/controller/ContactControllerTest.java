package com.iagokoch.portifolioapi.controller;

import com.iagokoch.portifolioapi.service.ContactService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.Import;
import com.iagokoch.portifolioapi.config.WebConfig;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

@Import(WebConfig.class)
@WebMvcTest(ContactController.class)
class ContactControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ContactService contactService;

    @Test
    void shouldReturnCreatedWhenContactIsValid() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Iago",
                                    "email": "iago@example.com",
                                    "message": "Olá, testando!"
                                }
                                """))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldReturnErrorWhenContactEmpty() throws Exception {
        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "name": "",
                            "email": "",
                            "message": ""
                        }
                        """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnErrorWhenEmailInvalid() throws Exception {
        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "name": "iago teste",
                            "email": "isso-nao-e-email",
                            "message": "erro email"
                            
                        }
                        """))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors.email").value("E-mail inválido."));

    }

    @Test
    void shouldAllowCorsForLocalFrontend() throws Exception {
        mockMvc.perform(options("/api/contact")
                .header("Origin", "http://localhost:5173")
                .header("Access-Control-Request-Method", "POST")
                .header("Access-Control-Request-Headers", "Content-Type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));
    }

    @Test
    void shouldRejectCorsForUnknownOrigin() throws Exception {
        mockMvc.perform(options("/api/contact")
                        .header("Origin", "https://example.com")
                        .header("Access-Control-Request-Method", "POST")
                        .header("Access-Control-Request-Headers", "Content-Type"))
                .andExpect(status().isForbidden())
                .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }


    @Test
    void shouldAcceptContactWhenHoneypotIsEmpty() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Iago",
                                    "email": "iago@example.com",
                                    "message": "Olá, testando!",
                                    "website": ""
                                }
                                """))
                .andExpect(status().isCreated());
    }


    @Test
    void shouldAcceptSilentlyWhenHoneypotIsFilled() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Iago",
                                    "email": "iago@example.com",
                                    "message": "Olá, testando!",
                                    "website": "https/example.com"
                                }
                                """))
                .andExpect(status().isCreated());
    }
}
