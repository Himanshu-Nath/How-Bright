import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CreatePasswordService {

  constructor( private http: HttpClient ) { }

  createPassword (user: any): Observable<any> {
    return this.http.put<any>('/api/createpassword', user, httpOptions).pipe(
      catchError(this.handleError<any>('createPassword'))
    );
  }

  getCreatePasswordStatus (key: string): Observable<any> {
    return this.http.get<any>('/api/createpassword/status/'+key).pipe(
      catchError(this.handleError<any>('getCreatePasswordStatus'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
