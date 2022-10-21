import { Component, Input, OnChanges, Output } from '@angular/core';
import { VARIABLES } from 'src/environments/constants';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnChanges {
  wikiLink?: string;
  @Input() breedImage?: string | null;
  constructor(public store: StoreService) {}

  ngOnChanges(): void {
    const name = this.store.breedName;
    if (name === VARIABLES.DEFAULT_INPUT_MESSAGE || !name) return;
    const adjustedBreedName = this.adjustBreedName(name);

    this.wikiLink = `https://en.wikipedia.org/wiki/${adjustedBreedName}`;
  }

  adjustBreedName(name: string): string {
    const adjustedBreedName = name.split(' ').join('_');

    return adjustedBreedName;
  }
}
