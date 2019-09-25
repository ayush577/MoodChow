import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrestaurantdetialPage } from './editrestaurantdetial.page';

describe('EditrestaurantdetialPage', () => {
  let component: EditrestaurantdetialPage;
  let fixture: ComponentFixture<EditrestaurantdetialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrestaurantdetialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrestaurantdetialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
