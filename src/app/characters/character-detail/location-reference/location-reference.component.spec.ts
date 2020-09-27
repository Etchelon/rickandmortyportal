import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationReferenceComponent } from './location-reference.component';

describe('LocationReferenceComponent', () => {
  let component: LocationReferenceComponent;
  let fixture: ComponentFixture<LocationReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
