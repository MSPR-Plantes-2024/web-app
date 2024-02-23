import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationCreation } from './publication/interfaces/publication-creation-interface';
import { User } from './publication/interfaces/user-interface';
import { Address } from './ajouter-publication/classes/adresse';
import { Plant } from './ajouter-publication/classes/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }


  getPlantsByUserId(userId: number): Observable<Plant[]> {
    return this.http.get<Plant[]>('http://localhost:8080/api/v1/plants/users/' + userId);
  } 
}
    
  
  
  



