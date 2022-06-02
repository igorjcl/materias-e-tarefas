package com.igor.backend.services;

import com.igor.backend.entities.Activity;
import com.igor.backend.repositories.ActivityRepository;
import com.igor.backend.repositories.SchoolSubjectsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ActivityService {

  private final ActivityRepository repository;
  private final SchoolSubjectsRepository schoolSubjectsRepository;

  public Activity update(Long activityId, Activity activityUpdated) {
    return this.repository
        .findById(activityId)
        .map(
            (activity) -> {
              activity.setDeliveryDate(activityUpdated.getDeliveryDate());
              activity.setName(activityUpdated.getName());
              return repository.save(activity);
            })
        .orElseThrow(() -> new EntityNotFoundException("Não foi possivel encontrar a atividade"));
  }

  public void complete(Long activityId) {
    this.repository
        .findById(activityId)
        .map(
            (activity) -> {
              activity.setStatus(false);
              activity.setInitialDate(LocalDateTime.now());
              return repository.save(activity);
            })
        .orElseThrow(() -> new EntityNotFoundException("Não foi possivel encontrar a atividade"));
  }

  public void remove(Long activityId) {
    this.repository.deleteById(activityId);
  }

  public void addActivity(Long id, Activity activity) {
    schoolSubjectsRepository
        .findById(id)
        .map(
            (it) -> {
              activity.setSchoolSubjects(it);
              activity.setInitialDate(LocalDateTime.now());
              return repository.save(activity);
            })
        .orElseThrow(() -> new EntityNotFoundException("Matéria não foi encontrada"));
  }
}
