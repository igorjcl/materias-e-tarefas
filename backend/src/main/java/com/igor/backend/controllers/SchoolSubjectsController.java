package com.igor.backend.controllers;

import com.igor.backend.entities.SchoolSubjects;
import com.igor.backend.models.ApiResponse;
import com.igor.backend.services.SchoolSubjectsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/school-subjects")
@RestController
@RequiredArgsConstructor
public class SchoolSubjectsController {

  private final SchoolSubjectsService service;

  @GetMapping
  public ResponseEntity<ApiResponse> findAll() {
    List<SchoolSubjects> schoolSubjects = service.findAll();
    ApiResponse response = ApiResponse.of(schoolSubjects);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @GetMapping("{id}")
  public ResponseEntity<ApiResponse> findById(@PathVariable Long id) {
    SchoolSubjects schoolSubjects = service.findById(id);
    ApiResponse response = ApiResponse.of(schoolSubjects);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PostMapping
  public ResponseEntity<ApiResponse> create(@RequestBody SchoolSubjects schoolSubjects) {
    SchoolSubjects schoolSubjectsSaved = service.create(schoolSubjects);
    ApiResponse response =
        ApiResponse.of(
            HttpStatus.CREATED.value(), "Matéria criada com sucesso", schoolSubjectsSaved);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PutMapping("{id}")
  public ResponseEntity<ApiResponse> update(
      @PathVariable Long id, @RequestBody SchoolSubjects schoolSubjects) {
    SchoolSubjects schoolSubjectsUpdated = service.update(id, schoolSubjects);
    ApiResponse response =
        ApiResponse.of(
            HttpStatus.OK.value(), "Matéria atualizada com sucesso", schoolSubjectsUpdated);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
    service.delete(id);
    ApiResponse response = ApiResponse.of(HttpStatus.OK.value(), "Matéria removida com sucesso");
    return ResponseEntity.status(response.getStatus()).body(response);
  }
}
