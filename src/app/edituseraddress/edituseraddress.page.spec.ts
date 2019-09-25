import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituseraddressPage } from './edituseraddress.page';

describe('EdituseraddressPage', () => {
  let component: EdituseraddressPage;
  let fixture: ComponentFixture<EdituseraddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituseraddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituseraddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
