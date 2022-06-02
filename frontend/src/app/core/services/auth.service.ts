import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/ApiResponse';
import { User } from '../interfaces/User';
import { UserDTO } from '../interfaces/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.api;

  isAuthenticated = new BehaviorSubject(false);
  user$: Observable<User> = this.isAuthenticated.pipe(
    map((it) => {
      const token = localStorage.getItem('token');
      if (!it || !token) {
        return null;
      }
      return JSON.parse(token);
    })
  );

  constructor(private http: HttpClient, private router: Router) {
    const authenticated = !!localStorage.getItem('token');
    this.isAuthenticated.next(authenticated);
  }

  login(user: UserDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/auth/login`, user).pipe(
      take(1),
      tap((response) => {
        localStorage.setItem('token', response.data?.token);
        this.isAuthenticated.next(true);
        this.router.navigate(['/materias']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  register(user: User): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.API_URL}/auth/register`, user)
      .pipe(
        take(1),
        tap((response) => {
          localStorage.setItem('token', response.data?.token);
          this.isAuthenticated.next(true);
          this.router.navigate(['/materias']);
        })
      );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return token;
  }
}
