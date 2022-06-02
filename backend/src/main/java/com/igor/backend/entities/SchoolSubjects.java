package com.igor.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "materias")
public class SchoolSubjects {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  private Boolean status = true;

  @OneToMany(mappedBy = "schoolSubjects", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @OrderBy
  private List<Activity> activities = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
