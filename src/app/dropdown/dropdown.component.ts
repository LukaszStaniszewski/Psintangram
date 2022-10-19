import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DogBreeds } from '../home-page/home-page.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  //   selectedBreed = '';
  @Input() dogBreeds: DogBreeds | undefined;
  @Output() selectedOption = new EventEmitter<string>();
  //   @ViewChild('selected') selected: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  setSelectedOption(ref: HTMLSelectElement) {
    this.selectedOption.emit(ref.value);
  }
}
