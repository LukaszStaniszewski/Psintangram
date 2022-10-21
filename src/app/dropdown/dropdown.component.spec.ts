import { Component, DebugElement, Injectable } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VARIABLES } from 'src/environments/constants';
import { StoreService } from '../services/store.service';

import { DropdownComponent } from './dropdown.component';

const mockDogBreeds = ['Affenpinisher', 'Akita', 'Australian Shepherd'];

class MockStoreService {
  isLoading = false;
  breedName = VARIABLES.DEFAULT_INPUT_MESSAGE;
}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      providers: [
        DropdownComponent,
        { provide: StoreService, useClass: MockStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    component = TestBed.inject(DropdownComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default stage', () => {
    it('it should display correct text message', () => {
      const dropdownElement: DebugElement = fixture.debugElement.query(
        By.css('select')
      );

      const select: HTMLSelectElement = dropdownElement.nativeElement;

      expect(select.value).toBe(storeService.breedName);
    });
  });

  describe('when user selects option', () => {
    it('should display selected option and StoreService breedName should update to selected value', () => {
      component.dogBreeds = mockDogBreeds;
      fixture.detectChanges();

      const dropdownElement: DebugElement = fixture.debugElement.query(
        By.css('select')
      );

      const select: HTMLSelectElement = dropdownElement.nativeElement;

      select.click();
      select.options[3];
      component.setSelectedOption(select);

      fixture.detectChanges();
      expect(storeService.breedName).toBe(mockDogBreeds[2]);

      expect(select.value).toBe(mockDogBreeds[2]);
    });
  });
});
