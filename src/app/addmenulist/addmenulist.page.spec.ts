import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmenulistPage } from './addmenulist.page';

describe('AddmenulistPage', () => {
  let component: AddmenulistPage;
  let fixture: ComponentFixture<AddmenulistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmenulistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmenulistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
