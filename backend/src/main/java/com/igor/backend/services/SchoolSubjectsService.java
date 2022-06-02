package com.igor.backend.services;

import com.igor.backend.entities.SchoolSubjects;
import com.igor.backend.entities.User;
import com.igor.backend.repositories.ActivityRepository;
import com.igor.backend.repositories.SchoolSubjectsRepository;
import com.igor.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchoolSubjectsService {
  private final SchoolSubjectsRepository repository;
  private final UserRepository userRepository;
  private final ActivityRepository activityRepository;

  public List<SchoolSubjects> findAll() {
    String username =
        ((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    return repository.findAllByUserUsername(username);
  }

  public SchoolSubjects findById(Long id) {
    return repository
        .findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Matéria não foi encontrada"));
  }

  public SchoolSubjects create(SchoolSubjects schoolSubjects) {
    User user = getCurrentUserId().get();
    try {
      schoolSubjects.setUser(user);
      return repository.save(schoolSubjects);
    } catch (Exception exception) {
      throw new RuntimeException("Não foi possivel criar a Matéria");
    }
  }

  public SchoolSubjects update(Long id, SchoolSubjects schoolSubjects) {
    try {
      return repository
          .findById(id)
          .map(
              schoolSubjectsToUpated -> {
                schoolSubjectsToUpated.setTitle(schoolSubjects.getTitle());
                return repository.save(schoolSubjectsToUpated);
              })
          .orElseThrow(() -> new EntityNotFoundException("Matéria não foi encontrada"));
    } catch (Exception exception) {
      throw new RuntimeException("Não foi possivel editar a Matéria");
    }
  }

  public void delete(Long id) {
    try {
      Optional<SchoolSubjects> schoolSubjects = repository.findById(id);
      if (schoolSubjects.isPresent()) {
        repository.deleteById(id);
      }
    } catch (Exception exception) {
      throw new RuntimeException("Não foi possivel remover a Matéria");
    }
  }

  private Optional<User> getCurrentUserId() {
    return Optional.ofNullable(SecurityContextHolder.getContext())
        .map(SecurityContext::getAuthentication)
        .filter(Authentication::isAuthenticated)
        .map(Authentication::getPrincipal)
        .map((user) -> ((String) user))
        .flatMap(userRepository::findByUsername);
  }
}
