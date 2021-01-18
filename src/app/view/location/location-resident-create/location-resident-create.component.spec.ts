import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationResidentCreateComponent } from './location-resident-create.component';

describe('LocationResidentCreateComponent', () => {
  let component: LocationResidentCreateComponent;
  let fixture: ComponentFixture<LocationResidentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationResidentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationResidentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
