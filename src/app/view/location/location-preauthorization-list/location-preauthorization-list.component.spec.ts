import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPreauthorizationListComponent } from './location-preauthorization-list.component';

describe('LocationPreauthorizationListComponent', () => {
  let component: LocationPreauthorizationListComponent;
  let fixture: ComponentFixture<LocationPreauthorizationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPreauthorizationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPreauthorizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
