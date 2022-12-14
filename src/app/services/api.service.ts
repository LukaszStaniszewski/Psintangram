import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';

export type ApiDogBreeds = {
  message: {
    [key: string]: string[];
  };
};

export type ApiBreedImage = {
  message: string;
  status: string;
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

  getBreedImage(breedName: string) {
    if (this.doesItHaveSubBread(breedName)) {
      const breed = breedName.split(' ');
      const mainBreed = breed[0].trim();
      const subBread = breed[1].trim();
      return this.http
        .get<ApiBreedImage>(
          `https://dog.ceo/api/breed/${mainBreed}/${subBread}/images/random`
        )
        .pipe(retry(3), catchError(this.handleError));
    }

    return this.http
      .get<ApiBreedImage>(
        `https://dog.ceo/api/breed/${breedName}/images/random`
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  private doesItHaveSubBread(breedName: string) {
    return breedName.match(/\s/i) ? true : false;
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

  makeIntentionalError() {
    return this.http.get('not/a/real/url').pipe(catchError(this.handleError));
  }
}
