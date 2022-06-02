import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';
import { UserDTO } from '../core/interfaces/UserDTO';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const user: UserDTO = this.form.value;
    this.authService
      .login(user)
      .pipe(
        tap((response) => {
          this.form.reset();
          this.router.navigate(['/materias']);
        })
      )
      .subscribe();
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
