import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, tap, catchError, throwError } from 'rxjs';

import { BASE_URL, MESSAGES_ENDPOINT } from '../../../shared/services/constants';
import { Message } from '../models/message';
import { User } from '../../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private static http: HttpClient;

  constructor(http: HttpClient) {
    MessageService.http = http;
   }

  public static getById(id: number): Observable<Message> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${MESSAGES_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => Message.fromJson(response)),
      tap(() => console.log('Message fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static getByUser(user: User): Observable<Array<Array<Message>>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${MESSAGES_ENDPOINT}/user/${user.id}`, { headers }).pipe(
      map((response: any) => response.map(response.map((json: Map<string, any>) => Message.fromJson(json)))),
      tap(() => console.log('Messages fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static create(message: Message): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<void>(`${BASE_URL}${MESSAGES_ENDPOINT}`, message.toJson(), { headers }).pipe(
      tap(() => console.log('Message created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static update(message: Message): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${MESSAGES_ENDPOINT}`, message.toJson(), { headers }).pipe(
      tap(() => console.log('Message updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static delete(message: Message): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${MESSAGES_ENDPOINT}/${message.id}`, { headers }).pipe(
      tap(() => console.log('Message deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
