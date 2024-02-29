import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationResponse } from './authentication-response.interface';
import { AuthenticationRequest } from './authentication-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/register', userData);
  }

  authenticateUser(authData: AuthenticationRequest): Observable<AuthenticationResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Récupère le jeton d'authentification depuis le stockage local
    });

    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/v1/auth/authenticate', authData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error during authentication:', error);
          return EMPTY;
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/refresh-token', {});
  }
}
