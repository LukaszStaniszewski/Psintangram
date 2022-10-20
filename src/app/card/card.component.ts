import { Component, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnChanges {
  wikiLink: string | undefined;
  name: string | undefined;
  @Input() breedImage: string | undefined;
  constructor() {}

  ngOnChanges(): void {
    const breedName = this.adjustBreedName();
    this.wikiLink = `https://en.wikipedia.org/wiki/${breedName}`;
  }

  adjustBreedName() {
    if (!this.breedImage) return;
    const splitedUrl = this.breedImage.split('/');
    let breedName;

    while (breedName === undefined) {
      for (let breedQuery of splitedUrl) {
        if (breedQuery.match(/-/i)) {
          this.name = breedQuery.split('-').join(' ');
          return (breedName = breedQuery.split('-').join('_'));
        }
      }
      return (breedName = splitedUrl[4]);
    }
    return breedName;
  }
}
