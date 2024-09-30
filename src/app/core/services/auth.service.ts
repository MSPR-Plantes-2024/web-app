import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADDRESSES_ENDPOINT, AUTHENTICATE_ENDPOINT, BASE_URL } from '../../shared/services/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {}
  
  public login(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${BASE_URL}${AUTHENTICATE_ENDPOINT}`, { 
      email: encodeURIComponent(email), 
      password: encodeURIComponent(password) 
    }).pipe( 
      
      tap(() => console.log('Address fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
