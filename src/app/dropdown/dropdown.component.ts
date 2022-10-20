import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { DogBreeds } from '../home-page/home-page.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements AfterViewInit {
  selectedBreed = 'wybierz rasę';

  @Input() dogBreeds: DogBreeds | undefined;
  @Output() selectedOption = new EventEmitter<string>();

  ngAfterViewInit(): void {
    const breed = sessionStorage.getItem('breed');
    if (!breed) return;
    this.selectedBreed = breed;
  }

  setSelectedOption(ref: HTMLSelectElement) {
    sessionStorage.setItem('breed', ref.value);

    this.selectedOption.emit(ref.value);
  }
}
