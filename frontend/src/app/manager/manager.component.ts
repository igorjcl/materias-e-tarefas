import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }


}
