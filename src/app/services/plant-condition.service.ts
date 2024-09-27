import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, tap, catchError, throwError } from 'rxjs';

import { BASE_URL, PLANT_CONDITIONS_ENDPOINT } from './constants';
import { PlantCondition } from '../models/plant-condition';

@Injectable({
  providedIn: 'root'
})
export class PlantConditionService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<PlantCondition>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PLANT_CONDITIONS_ENDPOINT}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => PlantCondition.fromJson(json))),
      tap(() => console.log('Plant conditions fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
