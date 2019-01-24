import { Injectable } from '@angular/core';
import { throwError as _throw ,  Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { PostResponse } from './model/postres.model';
import { URLSearchParams } from 'url';

@Injectable()
export class NameService {

  

  constructor(private http: HttpClient) { }

  public getNames() {
    return this.http.get('https://potent-exhaust.glitch.me/employees');
  }

  public getNamesPhp() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Access-Control-Allow-Origin': '*'
        // 'Access-Control-Allow-Methods': "*",
        // 'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      })
    };
    return this.http.get('http://localhost:8080/backend/getnames.php', httpOptions);
  }

  public postNames(body: string): Observable<PostResponse> {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<PostResponse>('http://localhost:8080/backend/addname.php', body, httpOptions).pipe( catchError(this.handleError));
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
    return this.http.delete<string>('http://localhost:8080/backend/deletename.php', httpOptions).pipe( catchError(this.handleError));
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
    return this.http.put<string>('http://localhost:8080/backend/updatename.php', body, httpOptions).pipe( catchError(this.handleError));
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
