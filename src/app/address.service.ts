import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationCreation } from './publication/interfaces/publication-creation-interface';
import { User } from './publication/interfaces/user-interface';
import { Address } from './ajouter-publication/classes/adresse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }


  getAdressByUserId(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>('http://localhost:8080/api/v1/addresses/user/' + userId);
  } 
}
    
  
  
  



