import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
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
  @ViewChild('selected') selected?: ElementRef<HTMLSelectElement>;

  ngAfterViewInit(): void {
    const test = sessionStorage.getItem('breed');
    if (!test) return;
    this.selectedBreed = test;
  }

  setSelectedOption(ref: HTMLSelectElement) {
    console.log(ref.value);
    sessionStorage.setItem('breed', ref.value);

    this.selectedOption.emit(ref.value);
  }
}
