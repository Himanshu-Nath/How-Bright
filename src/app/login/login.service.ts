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
export class LoginService {

  constructor( private http: HttpClient ) { }

  login (user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>('/api/login', user, httpOptions).pipe(
      tap((user: User) => this.log(`added hero w/ id=${user.username}`)),
      catchError(this.handleError<User>('login'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`); 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
