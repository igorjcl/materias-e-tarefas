import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { catchError, delay, EMPTY, map, pluck, switchMap, tap } from 'rxjs';

import { SchoolSubjects } from '../../interfaces/school-subjects';
import { SchoolSubjecsService } from '../../services/school-subjecs.service';

@Component({
  selector: 'app-school-subjects-edit',
  templateUrl: './school-subjects-edit.component.html',
  styleUrls: ['./school-subjects-edit.component.scss'],
  providers: [MessageService],
})
export class SchoolSubjectsEditComponent implements OnInit {
  form!: FormGroup;
  schoolSubjectsId!: any;

  constructor(
    private r: ActivatedRoute,
    private service: SchoolSubjecsService,
    private builder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();

    this.r.params
      .pipe(
        pluck('id'),
        switchMap((userId) => this.service.findById(userId)),
        map((response) => response.data),
        tap((schoolSubjects: SchoolSubjects) => {
          this.schoolSubjectsId = schoolSubjects.id;
          this.form.patchValue({
            title: schoolSubjects.title,
          });
        })
      )
      .subscribe();
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
      .put(this.schoolSubjectsId, values)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Materia editada com sucesso',
          });
        }),
        delay(1000),
        tap(() => {
          this.router.navigate(['/materias']);
        }),
        catchError((err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao tentar editar',
          });

          return EMPTY;
        })
      )
      .subscribe();
  }
}
