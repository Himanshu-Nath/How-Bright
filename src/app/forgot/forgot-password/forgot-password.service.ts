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
export class ForgotPasswordService {

  constructor( private http: HttpClient ) { }
  
  checkEmail (email: string): Observable<any> {
      return this.http.get<any>('/api/userbyemail/'+email).pipe(
        catchError(this.handleError<any>('checkEmail'))
      );
    }

    forgotPassword (user: any): Observable<any> {
      return this.http.post<any>('/api/forgotpassword/sendmail', user, httpOptions).pipe(
        catchError(this.handleError<any>('forgotPassword'))
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
