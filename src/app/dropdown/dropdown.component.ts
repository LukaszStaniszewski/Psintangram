import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DogBreeds } from '../home-page/home-page.component';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'Dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() dogBreeds: DogBreeds | undefined;
  @Output() selectedOption = new EventEmitter<string>();

  constructor(public store: StoreService) {}

  ngOnInit(): void {
    const storedBreed = sessionStorage.getItem('breed');
    if (!storedBreed) return;
    this.store.breedName = storedBreed;
  }

  setSelectedOption(ref: HTMLSelectElement) {
    this.store.breedName = ref.value;
    sessionStorage.setItem('breed', ref.value);

    this.selectedOption.emit(ref.value);
  }
}
