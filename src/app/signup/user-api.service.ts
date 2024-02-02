import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from './interfaces/user-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {



  constructor( private http:HttpClient) {}

  public recupererUser(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>('http://localhost:8080/api/v1/users/' + id);
  }
  
}


