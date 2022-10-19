import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

type ApiDogBreeds = {
  message: {
    [key: string]: string[];
  };
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  configUrl = `https://dog.ceo/api/breeds/list/all`;
  constructor(private http: HttpClient) {}

  getDogBreeds() {
    return this.http
      .get<ApiDogBreeds>(this.configUrl)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  //   makeIntentionalError() {
  //     return this.http.get('not/a/real/url').pipe(catchError(this.handleError));
  //   }
}
