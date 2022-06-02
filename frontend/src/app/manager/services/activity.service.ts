import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/interfaces/ApiResponse';
import { environment } from 'src/environments/environment';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly API_URL = `${environment.api}/activities`;
  constructor(private http: HttpClient) {}

  delete(id: any): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.API_URL}/${id}`);
  }

  complete(id: any): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.API_URL}/${id}/complete`, null);
  }

  update(id: any, activity: Activity): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API_URL}/${id}`, activity);
  }

  addActivity(id: any, activity: Activity): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.API_URL}/${id}/add-activity`,
      activity
    );
  }
}
