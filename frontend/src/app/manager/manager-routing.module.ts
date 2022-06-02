import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolSubjectsCreateComponent } from './components/school-subjects-create/school-subjects-create.component';
import { SchoolSubjectsEditComponent } from './components/school-subjects-edit/school-subjects-edit.component';
import { SchoolSubjectsListComponent } from './components/school-subjects-list/school-subjects-list.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: '',
        component: SchoolSubjectsListComponent,
      },
      {
        path: 'criar',
        component: SchoolSubjectsCreateComponent,
      },
      {
        path: ':id/editar',
        component: SchoolSubjectsEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
