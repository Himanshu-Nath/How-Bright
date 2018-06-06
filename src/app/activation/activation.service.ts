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
export class ActivationService {

  constructor( private http: HttpClient ) { }
  
    activate (key: string): Observable<any> {
      return this.http.get<any>('/api/useractivate/'+key).pipe(
        catchError(this.handleError<any>('activate'))
      );
    }

    getActivationStatus (key: string): Observable<any> {
      return this.http.get<any>('/api/userstatus/'+key).pipe(
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
