import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, tap } from 'rxjs';
import { SchoolSubjects } from '../../interfaces/school-subjects';
import { SchoolSubjecsService } from '../../services/school-subjecs.service';

@Component({
  selector: 'app-school-subjects-create',
  templateUrl: './school-subjects-create.component.html',
  styleUrls: ['./school-subjects-create.component.scss'],
  providers: [MessageService],
})
export class SchoolSubjectsCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private r: Router,
    private service: SchoolSubjecsService,
    private builder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  clear() {
    this.form.reset();
  }

  createForm(): FormGroup {
    return this.builder.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    const values = this.form.value as SchoolSubjects;
    this.service
      .create(values)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Materia cadastrada com sucesso',
          });

          this.clear();
        }),
        catchError((err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao tentar cadastrar materia',
          });
          return EMPTY;
        })
      )
      .subscribe();
  }
}
