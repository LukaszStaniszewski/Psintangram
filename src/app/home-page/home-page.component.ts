import { Component, OnInit } from '@angular/core';
import { ApiService, ApiDogBreeds } from '../core/api.service';

export type DogBreeds = string[];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  dogBreeds: DogBreeds = [];
  breedImage?: string | null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.breedImage = sessionStorage.getItem('image');
    this.apiService.getDogBreeds().subscribe((data) => {
      this.adaptList(data);
    });
  }

  setChoosenBreed(breedName: string) {
    const prevName = sessionStorage.getItem('prevName');
    if (!breedName || breedName === prevName) return;
    this.apiService.getBreedImage(breedName).subscribe((data) => {
      this.breedImage = data.message;
      sessionStorage.setItem('image', this.breedImage);
      sessionStorage.setItem('prevName', breedName);
    });
  }

  adaptList({ message }: ApiDogBreeds) {
    if (!message) return;
    for (let breed of Object.entries(message)) {
      if (breed[1]?.length) {
        for (let subbread of breed[1]) {
          this.dogBreeds.push(`${breed[0]} ${subbread}`);
        }
      } else if (this.dogBreeds.includes(breed[0]) === false) {
        this.dogBreeds.push(breed[0]);
      }
    }
  }
}
