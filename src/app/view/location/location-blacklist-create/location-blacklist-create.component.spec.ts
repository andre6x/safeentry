import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBlacklistCreateComponent } from './location-blacklist-create.component';

describe('LocationBlacklistCreateComponent', () => {
  let component: LocationBlacklistCreateComponent;
  let fixture: ComponentFixture<LocationBlacklistCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationBlacklistCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBlacklistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
