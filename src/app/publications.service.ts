import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http: HttpClient) { }

  getPublications(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/publications');
  }

  getPublicationById(publicationId: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/publications/' + publicationId);
  }
  getPlantById(plantId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v1/plants/${plantId}`);
  }
  
  }


