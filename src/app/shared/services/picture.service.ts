import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, tap, catchError, throwError } from 'rxjs';

import { BASE_URL, PICTURES_ENDPOINT } from './constants';
import { Picture } from '../models/picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private static http: HttpClient;

  constructor(http: HttpClient) {
    PictureService.http = http;
   }

  public static getById(id: number): Observable<Picture> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PICTURES_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => Picture.fromJson(response)),
      tap(() => console.log('Picture fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static create(picture: Picture): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<void>(`${BASE_URL}${PICTURES_ENDPOINT}`, picture.toJson(), { headers }).pipe(
      tap(() => console.log('Picture created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static update(picture: Picture): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${PICTURES_ENDPOINT}`, picture.toJson(), { headers }).pipe(
      tap(() => console.log('Picture updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static delete(picture: Picture): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${PICTURES_ENDPOINT}/${picture.id}`, { headers }).pipe(
      tap(() => console.log('Picture deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
