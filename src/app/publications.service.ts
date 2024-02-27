import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicationCreation } from './publication/interfaces/publication-creation-interface';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http: HttpClient) { }

  getPublications(): Observable<PublicationCreation[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/publications');
  }
  PostPublication(publicationCreation: PublicationCreation): Observable<PublicationCreation>{
    return this.http.post<PublicationCreation>('http://localhost:8080/api/v1/publications', publicationCreation);
  }
  getPublicationById(publicationId: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/publications/' + publicationId);
  }


  getPlantById(plantId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v1/plants/${plantId}`);
  }
  getOwnerByPublisherId(publisherId: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/users/' + publisherId);
  }

  getPublicationsByUserId(userId: number): Observable<PublicationCreation[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/publications/users/' + userId);
  }

  supprimerPublicationsById(publicationId: number){
    return this.http.delete('http://localhost:8080/api/v1/publications/' + publicationId);
  }
  
  }
    
  
  
  



