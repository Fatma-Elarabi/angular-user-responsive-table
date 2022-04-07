import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Result, User } from '../models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Result[]> {
    return this.http.get<User>(`${environment.apiUrl}?key=${environment.apiKey}&ref=lrmhl3zg&results=5`)
  .pipe(
     map( res => {
         return res.results;
     }),
     catchError( (err: HttpErrorResponse) => {
       console.log(err);
       
        return throwError(() => new Error(err.error));
     })
    );
  }
}
