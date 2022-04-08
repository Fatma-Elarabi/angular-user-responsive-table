import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Result, User } from '../models/users';
import { environment } from 'src/environments/environment';
import { DateAgoPipe } from '../../../shared/pipes/date-ago.pipe';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Result[]> {
    return this.http.get<User>(`${environment.apiUrl}?key=${environment.apiKey}&ref=hjgddx1b&results=10`)
      .pipe(
        map(res => {
          res.results.forEach(element => {
            element.seniority = new DateAgoPipe().transform(element.seniority * 1000);
          });
          return res.results;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(err.error));
        })
      );
  }
}
