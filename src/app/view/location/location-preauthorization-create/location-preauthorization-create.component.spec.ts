import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPreauthorizationCreateComponent } from './location-preauthorization-create.component';

describe('LocationPreauthorizationCreateComponent', () => {
  let component: LocationPreauthorizationCreateComponent;
  let fixture: ComponentFixture<LocationPreauthorizationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPreauthorizationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPreauthorizationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
