import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuModule } from 'primeng/menu';
import { MegaMenuItem } from 'primeng/api';

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, MenuModule],
  exports: [],
})
export class SharedModule {}
