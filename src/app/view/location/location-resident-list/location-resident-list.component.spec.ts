import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationResidentListComponent } from './location-resident-list.component';

describe('LocationResidentListComponent', () => {
  let component: LocationResidentListComponent;
  let fixture: ComponentFixture<LocationResidentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationResidentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationResidentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
