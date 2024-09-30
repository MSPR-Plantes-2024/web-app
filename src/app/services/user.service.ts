import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, USERS_ENDPOINT } from './constants';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static http: HttpClient;
  private static cookieService: CookieService;

  constructor(
    http: HttpClient,
    cookieService: CookieService) {
      UserService.http = http;
      UserService.cookieService = cookieService;
    }

  public static getById(id: number): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${USERS_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => User.fromJson(response)),
      tap(() => console.log('User fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static update(user: User): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${USERS_ENDPOINT}`, user.toJson(), { headers }).pipe(
      tap(() => console.log('User updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static delete(user: User): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${USERS_ENDPOINT}/${user.id}`, { headers }).pipe(
      tap(() => console.log('User deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public static setCurrent(user: User, expirationDate: Date): void {
    this.cookieService.set('user', JSON.stringify(user), expirationDate);
  }

  public static getCurrent(): User {
    return User.fromJson(JSON.parse(this.cookieService.get('user')));
  }

  public static removeCurrent(): void {
    this.cookieService.delete('user');
  }

  public static isCurrent(user: User): boolean {
    return User.fromJson(JSON.parse(this.cookieService.get('user'))).id === user.id;
  }
}
