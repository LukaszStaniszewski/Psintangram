import { Component, OnInit } from '@angular/core';
import { ApiService, ApiDogBreeds } from '../core/api.service';

export type BreedsList = string[];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  breedList: BreedsList = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDogBreeds().subscribe((data) => {
      this.adaptList(data);
    });
  }

  adaptList({ message }: ApiDogBreeds) {
    if (!message) return;
    for (let breed of Object.entries(message)) {
      if (breed[1]?.length) {
        for (let subbread of breed[1]) {
          this.breedList.push(`${breed[0]}: ${subbread}`);
        }
      } else if (this.breedList.includes(breed[0]) === false) {
        this.breedList.push(breed[0]);
      }
    }
  }
}
