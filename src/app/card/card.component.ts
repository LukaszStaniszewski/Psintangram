import { Component, Input, OnChanges, Output } from '@angular/core';
import { VARIABLES } from 'src/environments/constants';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'Card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnChanges {
  wikiLink?: string;
  @Input() breedImage?: string | null;
  constructor(public store: StoreService) {}

  ngOnChanges(): void {
    const name = this.setSavedBreedName(this.store.breedName);
    if (name === VARIABLES.DEFAULT_INPUT_MESSAGE || !name) return;
    const adjustedBreedName = this.adjustBreedName(name);

    this.wikiLink = `https://en.wikipedia.org/wiki/${adjustedBreedName}`;
  }

  setSavedBreedName(name: string) {
    if (name !== VARIABLES.DEFAULT_INPUT_MESSAGE) return name;
    const breedName = sessionStorage.getItem('breed');
    return breedName;
  }

  adjustBreedName(name: string): string {
    const adjustedBreedName = name.split(' ').join('_');

    return adjustedBreedName;
  }
}
