package com.igor.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ApiResponse {

  private int status;
  private String message;
  private Object data;

  public static ApiResponse of(Object data) {
    return ApiResponse.builder().status(200).message("").data(data).build();
  }

  public static ApiResponse of(int status, String message) {
    return ApiResponse.builder().status(status).message(message).data(null).build();
  }

  public static ApiResponse of(int status, String message, Object data) {
    return ApiResponse.builder().status(status).message(message).data(data).build();
  }
}
