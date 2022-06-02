package com.igor.backend.controllers;

import com.igor.backend.entities.Activity;
import com.igor.backend.models.ApiResponse;
import com.igor.backend.services.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/activities")
@RestController
@RequiredArgsConstructor
public class ActivityController {

  private final ActivityService service;

  @DeleteMapping("{id}")
  public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
    service.remove(id);
    ApiResponse response = ApiResponse.of(HttpStatus.OK.value(), "Tarefa removida com sucesso");
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PatchMapping("{id}/complete")
  public ResponseEntity<ApiResponse> complete(@PathVariable Long id) {
    service.complete(id);
    ApiResponse response = ApiResponse.of(HttpStatus.OK.value(), "Tarefa concluida");
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PutMapping("{id}")
  public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody Activity activity) {
    Activity activityUpdated = service.update(id, activity);
    ApiResponse response =
        ApiResponse.of(HttpStatus.OK.value(), "Tarefa atualizada", activityUpdated);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PostMapping("{schoolSubjectsId}/add-activity")
  public ResponseEntity<ApiResponse> addActivity(
      @PathVariable Long schoolSubjectsId, @RequestBody Activity activity) {
    service.addActivity(schoolSubjectsId, activity);
    ApiResponse response = ApiResponse.of(HttpStatus.OK.value(), "Tarefa criada com sucesso");
    return ResponseEntity.status(response.getStatus()).body(response);
  }
}
