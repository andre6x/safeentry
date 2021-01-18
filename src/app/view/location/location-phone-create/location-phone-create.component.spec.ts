import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPhoneCreateComponent } from './location-phone-create.component';

describe('LocationPhoneCreateComponent', () => {
  let component: LocationPhoneCreateComponent;
  let fixture: ComponentFixture<LocationPhoneCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPhoneCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPhoneCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
