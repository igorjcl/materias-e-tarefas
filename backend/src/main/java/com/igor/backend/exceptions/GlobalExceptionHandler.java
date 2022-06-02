package com.igor.backend.exceptions;

import com.igor.backend.models.ErrorResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.PrintWriter;
import java.io.StringWriter;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(UsernameAlreadyUsedException.class)
  protected ResponseEntity<ErrorResponse> handleUsernameAlreadyUsedException(
      RuntimeException ex, WebRequest request) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    ErrorResponse errorResponse = new ErrorResponse(status, ex.getMessage());
    return ResponseEntity.status(status).body(errorResponse);
  }

  @ExceptionHandler(EntityNotFoundException.class)
  protected ResponseEntity<ErrorResponse> handleEntityNotFoundException(
      RuntimeException ex, WebRequest request) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    ErrorResponse errorResponse = new ErrorResponse(status, ex.getMessage());
    return ResponseEntity.status(status).body(errorResponse);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    e.printStackTrace(printWriter);
    String stackTrace = stringWriter.toString();
    ErrorResponse errorResponse = new ErrorResponse(status, e.getMessage(), stackTrace);

    return ResponseEntity.status(status).body(errorResponse);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    StringWriter stringWriter = new StringWriter();
    PrintWriter printWriter = new PrintWriter(stringWriter);
    e.printStackTrace(printWriter);
    String stackTrace = stringWriter.toString();
    ErrorResponse errorResponse = new ErrorResponse(status, e.getMessage(), stackTrace);

    return ResponseEntity.status(status).body(errorResponse);
  }
}
