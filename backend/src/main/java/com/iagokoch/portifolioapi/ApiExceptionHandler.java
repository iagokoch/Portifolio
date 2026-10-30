package com.iagokoch.portifolioapi;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException exception){
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, "Confira os dados enviados"
        );
        Map<String, String> errors = new LinkedHashMap<>();

        for (var fieldError : exception.getBindingResult().getFieldErrors()){
            errors.putIfAbsent(
                    fieldError.getField(),
                    fieldError.getDefaultMessage()
            );
        }
        problem.setProperty("errors", errors);
        return problem;
    }
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleUnexpected(Exception exception) throws Exception{
        if (exception instanceof ErrorResponse){
            throw exception;
        }
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Não foi possível enviar sua mensagem. Entre em contato pelo WhatsApp ou tente novamente mais tarde."
        );
    }
}
