import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VARIABLES } from 'src/environments/constants';
import { ApiService } from '../services/api.service';
import { StoreService } from '../services/store.service';

import { HomePageComponent } from './home-page.component';

class MockStoreService {
  isLoading = false;
  breedName = VARIABLES.DEFAULT_INPUT_MESSAGE;
}

class MockApiSerice {
  getDogBreeds() {}
  getBreedImage() {
    return {
      subscribe: (arg: any) => arg,
    };
  }
}

fdescribe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let storeService: StoreService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        HomePageComponent,
        { provide: StoreService, useClass: MockStoreService },
        ApiService,
        { provide: ApiService, useClass: MockApiSerice },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    apiService = TestBed.inject(ApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
