import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationVehicleCreateComponent } from './location-vehicle-create.component';

describe('LocationVehicleCreateComponent', () => {
  let component: LocationVehicleCreateComponent;
  let fixture: ComponentFixture<LocationVehicleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationVehicleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationVehicleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
