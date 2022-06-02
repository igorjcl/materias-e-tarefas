package com.igor.backend.controllers;

import com.igor.backend.entities.User;
import com.igor.backend.models.ApiResponse;
import com.igor.backend.models.dto.UserDTO;
import com.igor.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<?> registrar(@RequestBody User user) {
    Map<String, Object> token = authService.register(user);
    ApiResponse response =
        ApiResponse.of(HttpStatus.CREATED.value(), "Usuario Cadastrado com sucesso", token);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody UserDTO user) {
    Map<String, Object> token = authService.login(user);
    ApiResponse response =
        ApiResponse.of(HttpStatus.OK.value(), "Login realizado com sucesso", token);
    return ResponseEntity.status(response.getStatus()).body(response);
  }
}
