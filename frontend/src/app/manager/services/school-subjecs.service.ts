import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/interfaces/ApiResponse';
import { environment } from 'src/environments/environment';
import { Activity } from '../interfaces/activity';
import { SchoolSubjects } from '../interfaces/school-subjects';

@Injectable({
  providedIn: 'root',
})
export class SchoolSubjecsService {
  private readonly API_URL = `${environment.api}/school-subjects`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL);
  }

  findById(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/${id}`);
  }

  create(schoolSubjects: SchoolSubjects): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}`, schoolSubjects);
  }

  put(id: any, schoolSubjects: SchoolSubjects): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API_URL}/${id}`, schoolSubjects);
  }

  delete(id: any): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.API_URL}/${id}`);
  }


}
