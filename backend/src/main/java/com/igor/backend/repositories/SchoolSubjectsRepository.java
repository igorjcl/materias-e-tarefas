package com.igor.backend.repositories;

import com.igor.backend.entities.SchoolSubjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolSubjectsRepository extends JpaRepository<SchoolSubjects, Long> {
  List<SchoolSubjects> findAllByUserUsername(String username);
}
