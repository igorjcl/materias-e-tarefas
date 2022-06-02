package com.igor.backend.services;

import com.igor.backend.entities.User;
import com.igor.backend.exceptions.UsernameAlreadyUsedException;
import com.igor.backend.models.dto.UserDTO;
import com.igor.backend.repositories.UserRepository;
import com.igor.backend.security.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final JWTUtils jwtUtils;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  public Map<String, Object> register(User user) {
    Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());

    if (optionalUser.isPresent()) {
      throw new UsernameAlreadyUsedException();
    }

    String passwordEncoded = passwordEncoder.encode(user.getPassword());
    user.setPassword(passwordEncoded);
    userRepository.save(user);
    String token = jwtUtils.generateToken(user.getUsername());
    return Collections.singletonMap("token", token);
  }

  public Map<String, Object> login(UserDTO userDTO) {
    try {
      UsernamePasswordAuthenticationToken authInputToken =
          new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword());
      authenticationManager.authenticate(authInputToken);
      String token = jwtUtils.generateToken(userDTO.getUsername());
      return Collections.singletonMap("token", token);
    } catch (AuthenticationException exception) {
      throw new RuntimeException("Credenciais invalidas");
    }
  }
}
