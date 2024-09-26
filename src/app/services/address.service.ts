import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BASE_URL, ADDRESSES_ENDPOINT } from './constants';
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import { User } from '../models/user';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}

  getById(id: number) {
    return this.http.get(`${BASE_URL}${ADDRESSES_ENDPOINT}/${id}`).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getByUser(user: User) {
    return this.http.get(`${BASE_URL}${ADDRESSES_ENDPOINT}/user/${user.id}`).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  create(address: Address) {
    return this.http.post(`${BASE_URL}${ADDRESSES_ENDPOINT}`, address.fromJson()).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
