import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../objects/user';
import { Config } from '../app.config';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor( private http: HttpClient ) { }

  register (user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>('/api/register', user, httpOptions).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  availabilityCheck (data: string): Observable<any> {
    return this.http.get<any>('/api/availabilitycheck/'+data).pipe(
      catchError(this.handleError<any>('activate'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
    
}
