import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './signup/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  createUser(userData: UserInterface): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/register', userData);
  }
}
