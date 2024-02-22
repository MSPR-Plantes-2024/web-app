import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationCreation } from './publication/interfaces/publication-creation-interface';
import { User } from './publication/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserById(userId: number): Observable<User> {
    return this.http.get<any>('http://localhost:8080/api/v1/users/' + userId);
  } 
  }
    
  
  
  



