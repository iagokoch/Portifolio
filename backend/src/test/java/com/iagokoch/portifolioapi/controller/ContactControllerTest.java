package com.iagokoch.portifolioapi.controller;

import com.iagokoch.portifolioapi.service.ContactService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
                            "email": "isso-nao-e-email"
                            
                        }
                        """))
                .andExpect(status().isBadRequest());jsonPath("$.errors.email").value("E-mail inválido.");

    }
}
