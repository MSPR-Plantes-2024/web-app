import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './publication/interfaces/user-interface';
import { UserInterface } from './signup/interfaces/user-interface';
import { UserMinimalDto } from './signin/class/userMinimalDTO';

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

  getUsers(): Observable<UserMinimalDto[]> {
    return this.http.get<UserMinimalDto[]>('http://localhost:8080/api/v1/users' )
      .pipe(
        catchError(error => {
          console.error('Error getting user by ID:', error);
          return throwError('Something went wrong while fetching user data');
        })
      );
  } 

    Updateuser(userId: number, updatedUser: UserInterface): Observable<User> {
    return this.http.put<User>('http://localhost:8080/api/v1/users/' + userId, updatedUser)
      .pipe(
        catchError(error => {
          console.error('Error updating user:', error);
          return throwError('Something went wrong while updating user data');
        })
      );
  }
  
}
