import { Injectable } from '@angular/core';
import { VARIABLES } from 'src/environments/constants';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  breedName: string = VARIABLES.DEFAULT_INPUT_MESSAGE;
  isLoading = false;
  constructor() {}
}
