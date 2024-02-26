import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './signup/interfaces/user-interface'; // Assurez-vous que le chemin d'importation est correct

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  createUser(userData: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('http://localhost:8080/api/v1/users', userData);
    }
}
