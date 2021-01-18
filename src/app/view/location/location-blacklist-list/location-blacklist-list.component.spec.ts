import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBlacklistListComponent } from './location-blacklist-list.component';

describe('LocationBlacklistListComponent', () => {
  let component: LocationBlacklistListComponent;
  let fixture: ComponentFixture<LocationBlacklistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationBlacklistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBlacklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
