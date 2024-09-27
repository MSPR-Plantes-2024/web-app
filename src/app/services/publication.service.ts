import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, tap, catchError, throwError } from 'rxjs';

import { BASE_URL, PUBLICATION_ENDPOINT } from './constants';
import { Publication } from '../models/publication';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

  public getById(id: number): Observable<Publication> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PUBLICATION_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => Publication.fromJson(response)),
      tap(() => console.log('Publication fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public getAll(): Observable<Array<Publication>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PUBLICATION_ENDPOINT}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => Publication.fromJson(json))),
      tap(() => console.log('Publications fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public getByUser(user: User): Observable<Array<Publication>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PUBLICATION_ENDPOINT}/user/${user.id}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => Publication.fromJson(json))),
      tap(() => console.log('Publications fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public create(publication: Publication): Observable<Publication> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${BASE_URL}${PUBLICATION_ENDPOINT}`, publication.toJson(), { headers }).pipe(
      map((response: any) => Publication.fromJson(response)),
      tap(() => console.log('Publication created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public update(publication: Publication): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${PUBLICATION_ENDPOINT}`, publication.toJson(), { headers }).pipe(
      tap(() => console.log('Publication updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public delete(publication: Publication): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${PUBLICATION_ENDPOINT}/${publication.id}`, { headers }).pipe(
      tap(() => console.log('Publication deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
