import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, map, Subject, switchMap, take, tap } from 'rxjs';
import { Activity } from '../../interfaces/activity';
import { SchoolSubjects } from '../../interfaces/school-subjects';
import { ActivityService } from '../../services/activity.service';
import { SchoolSubjecsService } from '../../services/school-subjecs.service';

@Component({
  selector: 'app-school-subjects-view',
  templateUrl: './school-subjects-view.component.html',
  styleUrls: ['./school-subjects-view.component.scss'],
})
export class SchoolSubjectsViewComponent implements OnInit {
  id!: any;
  private schoolSubjects$ = new BehaviorSubject<any>({});
  editedSchoolSubjects$ = this.schoolSubjects$.asObservable();

  form!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: SchoolSubjecsService,
    private activityService: ActivityService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.findById().subscribe();
  }

  addActivity() {
    const values = this.form.value as Activity;
    const id = this.config.data.id;

    this.activityService
      .addActivity(id, values)
      .pipe(
        take(1),
        switchMap(() => this.findById()),
        tap(() => this.clean())
      )
      .subscribe();
  }

  clean() {
    this.form.reset();
  }

  createForm(): FormGroup {
    return this.builder.group({
      name: ['', Validators.required],
      deliveryDate: [null, Validators.required],
    });
  }

  findById() {
    return this.service.findById(this.config.data.id).pipe(
      map(({ data }) => data),
      tap((schoolSubjects) => {
        this.schoolSubjects$.next(schoolSubjects);
      })
    );
  }

  complete(id: any) {
    this.activityService
      .complete(id)
      .pipe(
        take(1),
        map(({ data }) => data),
        tap((schoolSubjects) => {
          this.schoolSubjects$.next(schoolSubjects);
        }),
        switchMap(() => this.findById())
      )
      .subscribe();
  }

  delete(id: any) {
    return this.activityService
      .delete(id)
      .pipe(
        take(1),
        map(({ data }) => data),
        tap((schoolSubjects) => {
          this.schoolSubjects$.next(schoolSubjects);
        }),
        switchMap(() => this.findById())
      )
      .subscribe();
  }
}
