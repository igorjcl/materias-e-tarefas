import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { SchoolSubjects } from '../../interfaces/school-subjects';
import { SchoolSubjecsService } from '../../services/school-subjecs.service';
import { SchoolSubjectsViewComponent } from '../school-subjects-view/school-subjects-view.component';

@Component({
  selector: 'app-school-subjects-list',
  templateUrl: './school-subjects-list.component.html',
  styleUrls: ['./school-subjects-list.component.scss'],
  providers: [MessageService, DialogService],
})
export class SchoolSubjectsListComponent implements OnInit {
  schoolSubjects$: Observable<SchoolSubjects[]> = new Observable<
    SchoolSubjects[]
  >();

  constructor(
    private schoolSubjects: SchoolSubjecsService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.schoolSubjects$ = this.schoolSubjects
      .findAll()
      .pipe(map(({ data }) => data));
  }

  delete(id: any): void {
    this.schoolSubjects
      .delete(id)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Materia removida com sucesso',
          });
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro tentar remover materia',
          });

          return EMPTY;
        })
      )
      .subscribe(() => this.listAll());
  }

  showSchoolSubjectsView(schoolSubjects: SchoolSubjects) {
    const ref = this.dialogService.open(SchoolSubjectsViewComponent, {
      header: schoolSubjects.title,
      width: '60%',
      data: {
        id: schoolSubjects.id,
      },
    });
  }
}
