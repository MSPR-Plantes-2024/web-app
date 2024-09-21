import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BASE_URL, ADDRESSES_ENDPOINT } from './constants';
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

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
}
