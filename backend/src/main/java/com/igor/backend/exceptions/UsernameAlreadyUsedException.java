package com.igor.backend.exceptions;

public class UsernameAlreadyUsedException extends RuntimeException {
  public UsernameAlreadyUsedException() {
    super("Usuario ja existe");
  }
}
