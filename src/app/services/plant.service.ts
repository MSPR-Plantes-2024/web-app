import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, tap, catchError, throwError } from 'rxjs';

import { BASE_URL, PLANTS_ENDPOINT } from './constants';
import { Plant } from '../models/plant';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  public getById(id: number): Observable<Plant> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PLANTS_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => Plant.fromJson(response)),
      tap(() => console.log('Plant fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public getByAddress(address: Address): Observable<Array<Plant>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${PLANTS_ENDPOINT}/address/${address.id}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => Plant.fromJson(json))),
      tap(() => console.log('Plants fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public create(plant: Plant): Observable<Plant> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${BASE_URL}${PLANTS_ENDPOINT}`, plant.toJson(), { headers }).pipe(
      map((response: any) => Plant.fromJson(response)),
      tap(() => console.log('Plant created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public update(plant: Plant): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${PLANTS_ENDPOINT}`, plant.toJson(), { headers }).pipe(
      tap(() => console.log('Plant updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public delete(plant: Plant): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${PLANTS_ENDPOINT}/${plant.id}`, { headers }).pipe(
      tap(() => console.log('Plant deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
