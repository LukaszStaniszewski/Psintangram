import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VARIABLES } from 'src/environments/constants';
import { StoreService } from '../services/store.service';

import { CardComponent } from './card.component';

class MockStoreService {
  isLoading = false;
  breedName = VARIABLES.DEFAULT_INPUT_MESSAGE;
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        CardComponent,
        { provide: StoreService, useClass: MockStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    component = TestBed.inject(CardComponent);

    spyOn(component, 'adjustBreedName').and.callThrough();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe("user hasn't selected dog breed", () => {
    it('should display default image', () => {
      const cardElement: DebugElement = fixture.debugElement.query(
        By.css('[data-test="default-image"]')
      );

      const img: HTMLImageElement = cardElement.nativeElement;
      expect(img.src).toContain('assets/dog-paw-rafiki.svg');
    });

    it("shold not display 'Poczytaj więcej o tej rasie na wikipedii:' text", () => {
      const cardElement: DebugElement = fixture.debugElement.query(
        By.css('[data-test="info-text"]')
      );
      const p: HTMLElement = cardElement.nativeElement;

      expect(p).toHaveClass('hide');
    });

    it('wikiLink should be undefined', () => {
      expect(component.wikiLink).toBeUndefined();
    });

    it('breedImage should be undefined', () => {
      expect(component.breedImage).toBeUndefined();
    });

    it('adjustBreedName function should not have been be called', () => {
      component.ngOnChanges();
      expect(component.adjustBreedName).not.toHaveBeenCalled();
    });
  });

  describe('user selected dog breed', () => {
    beforeEach(() => {
      storeService.breedName = 'Buhund Norwegian';
    });

    it('adjustBreedName function should return valid breed name', () => {
      expect(component.adjustBreedName(storeService.breedName)).toEqual(
        'Buhund_Norwegian'
      );
    });
    it('ngOnChanges should return valid wiki link', () => {
      component.ngOnChanges();
      expect(component.wikiLink).toBe(
        'https://en.wikipedia.org/wiki/Buhund_Norwegian'
      );
    });

    it('should display correct image', () => {
      const cardElement: DebugElement = fixture.debugElement.query(
        By.css('img')
      );
      const img: HTMLImageElement = cardElement.nativeElement;
      expect(img).toBeTruthy();
    });
  });
});
