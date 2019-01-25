import { Injectable } from '@angular/core';
import { throwError as _throw ,  Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { PostResponse } from './model/postres.model';
import { URLSearchParams } from 'url';
import {environment} from '../environments/environment';

@Injectable()
export class NameService {

  private serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  public getNamesPhp() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(this.serverUrl + 'getnames.php', httpOptions);
  }

  public postNames(body: string): Observable<PostResponse> {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<PostResponse>(this.serverUrl + 'addname.php', body, httpOptions).pipe( catchError(this.handleError));
  }

  public deleteNamesPhp(id: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params: {
        id: id
      }
    };
    return this.http.delete<string>(this.serverUrl + 'deletename.php', httpOptions).pipe( catchError(this.handleError));
  }

  public updateNamePhp(id: string, body: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type':  'application/json'
      }),
      params: {
        id: id
      }
    };
    return this.http.put<string>(this.serverUrl + 'updatename.php', body, httpOptions).pipe( catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong, 
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return _throw(
      'Something bad happened; please try again later.');
  }

}
