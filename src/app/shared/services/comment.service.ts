import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { COMMENTS_ENDPOINT, BASE_URL } from './constants';
import { Comment } from '../models/comment';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly http: HttpClient) { }

  public getByPublication(publication: Publication): Observable<Array<Comment>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${BASE_URL}${COMMENTS_ENDPOINT}/publication/${publication.id}`, { headers }).pipe(
      map((response: any) => response.map((json: Map<string, any>) => Comment.fromJson(json))),
      tap(() => console.log('Comments fetched successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public create(comment: Comment): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<void>(`${BASE_URL}${COMMENTS_ENDPOINT}`, comment.toJson(), { headers }).pipe(
      tap(() => console.log('Comment created successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public update(comment: Comment): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<void>(`${BASE_URL}${COMMENTS_ENDPOINT}`, comment.toJson(), { headers }).pipe(
      tap(() => console.log('Comment updated successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  public delete(comment: Comment): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(`${BASE_URL}${COMMENTS_ENDPOINT}/${comment.id}`, { headers }).pipe(
      tap(() => console.log('Comment deleted successfully')),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
