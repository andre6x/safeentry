import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPhoneListComponent } from './location-phone-list.component';

describe('LocationPhoneListComponent', () => {
  let component: LocationPhoneListComponent;
  let fixture: ComponentFixture<LocationPhoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPhoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
