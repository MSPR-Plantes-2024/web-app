import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationResponse } from './authentication-response.interface';
import { AuthenticationRequest } from './authentication-request.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/register', userData);
  }

  authenticateUser(authData: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/v1/auth/authenticate', authData)
      .pipe(
        tap((response: AuthenticationResponse) => {
          localStorage.setItem('authToken', response.accessToken); // Stocker le token dans le localStorage
        }),
        catchError(error => {
          throw error;
        })
      );
  }
  

  refreshToken(): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/refresh-token', {});
  }
}
