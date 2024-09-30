import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Jwt } from '../../core/models/jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private static cookieService: CookieService;
  private static http: HttpClient;

  constructor(cookieService: CookieService, http: HttpClient) { 
    JwtService.cookieService = cookieService;
    JwtService.http = http;
  }

  public static setToken(jwt: Jwt): void {
    let decodedRefreshToken:any = jwtDecode(jwt.refreshToken);
    this.cookieService.set('jwt', jwt.token, jwt.expirationDateTime, '/');
    this.cookieService.set('refreshToken', jwt.refreshToken, new Date(decodedRefreshToken.exp! * 1000), '/');
  }

  public static getToken(): Jwt {
    return new Jwt(
      this.cookieService.get('jwt'),
      this.cookieService.get('refreshToken'),
      new Date(jwtDecode(this.cookieService.get('jwt')).exp! * 1000),
    );
  }

  public static deleteToken(): void {
    this.cookieService.delete('jwt');
    this.cookieService.delete('refreshToken');
  }

  public static isTokenExpired(): boolean {
    return new Date(jwtDecode(this.cookieService.get('jwt')).exp! * 1000) < new Date();
  }

  public static refreshToken(): Observable<void> {
    return this.http.post<Jwt>('/api/auth/refresh', { refreshToken: this.cookieService.get('refreshToken') }).pipe(
      map((jwt: Jwt) => {
        console.log('Token refreshed');
        this.setToken(jwt);
        return void 0;
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      }));
  }
}
