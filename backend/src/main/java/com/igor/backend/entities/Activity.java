package com.igor.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "atividades")
@Entity
public class Activity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome")
  private String name;

  @Column(name = "data_inicial")
  private LocalDateTime initialDate;

  @Column(name = "data_entrega")
  private LocalDateTime deliveryDate;

  private Boolean status = true;

  @ManyToOne(fetch = FetchType.EAGER)
  @JsonIgnore
  @JoinColumn(name = "materia_id")
  private SchoolSubjects schoolSubjects;
}
