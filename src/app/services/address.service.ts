import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import { BASE_URL, ADDRESSES_ENDPOINT } from './constants';
import { User } from '../models/user';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Address> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${ADDRESSES_ENDPOINT}/${id}`, { headers }).pipe(
      map((response: any) => Address.fromJson(response)),
      tap(() => console.log('Address fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getByUser(user: User): Observable<Array<Address>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${ADDRESSES_ENDPOINT}/user/${user.id}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => Address.fromJson(json))),
      tap(() => console.log('Addresses fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  create(address: Address): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<void>(`${BASE_URL}${ADDRESSES_ENDPOINT}`, address.toJson(), { headers }).pipe(
      tap(() => console.log('Address created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  update(address: Address): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${ADDRESSES_ENDPOINT}`, address.toJson(), { headers }).pipe(
      tap(() => console.log('Address updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  delete(address: Address): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${ADDRESSES_ENDPOINT}/${address.id}`, { headers }).pipe(
      tap(() => console.log('Address deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
