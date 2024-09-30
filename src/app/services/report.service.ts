import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, tap, catchError, throwError } from 'rxjs';

import { BASE_URL, REPORTS_ENDPOINT } from './constants';
import { Report } from '../models/report';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private static http: HttpClient;

  constructor(http: HttpClient) {
    ReportService.http = http;
   }

  public static getById(id: number): Observable<Report> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${REPORTS_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => Report.fromJson(response)),
      tap(() => console.log('Report fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static getByPublication(publication: Publication): Observable<Array<Report>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${REPORTS_ENDPOINT}/publication/${publication.id}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => Publication.fromJson(json))),
      tap(() => console.log('Reports fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static create(report: Report): Observable<Report> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${BASE_URL}${REPORTS_ENDPOINT}`, report.toJson(), { headers }).pipe(
      map((response: any) => Report.fromJson(response)),
      tap(() => console.log('Report created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static update(report: Report): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${REPORTS_ENDPOINT}`, report.toJson(), { headers }).pipe(
      tap(() => console.log('Report updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static delete(report: Report): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${REPORTS_ENDPOINT}/${report.id}`, { headers }).pipe(
      tap(() => console.log('Report deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
