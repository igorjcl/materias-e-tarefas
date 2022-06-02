import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { SchoolSubjectsCreateComponent } from './components/school-subjects-create/school-subjects-create.component';
import { SchoolSubjectsEditComponent } from './components/school-subjects-edit/school-subjects-edit.component';
import { SchoolSubjectsListComponent } from './components/school-subjects-list/school-subjects-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolSubjectsViewComponent } from './components/school-subjects-view/school-subjects-view.component';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ActivityComponent } from './components/activity/activity.component';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    ManagerComponent,
    SchoolSubjectsCreateComponent,
    SchoolSubjectsEditComponent,
    SchoolSubjectsListComponent,
    SchoolSubjectsViewComponent,
    ActivityComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ManagerRoutingModule,
    SharedModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    ChipModule,
  ],
  entryComponents: [SchoolSubjectsViewComponent],
})
export class ManagerModule {}
