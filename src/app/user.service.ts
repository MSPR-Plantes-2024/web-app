import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './publication/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>('http://localhost:8080/api/v1/users/' + userId)
      .pipe(
        catchError(error => {
          console.error('Error getting user by ID:', error);
          return throwError('Something went wrong while fetching user data');
        })
      );
  } 
}
