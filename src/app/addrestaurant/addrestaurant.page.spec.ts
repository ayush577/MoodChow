import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrestaurantPage } from './addrestaurant.page';

describe('AddrestaurantPage', () => {
  let component: AddrestaurantPage;
  let fixture: ComponentFixture<AddrestaurantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrestaurantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
