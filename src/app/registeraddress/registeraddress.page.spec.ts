import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteraddressPage } from './registeraddress.page';

describe('RegisteraddressPage', () => {
  let component: RegisteraddressPage;
  let fixture: ComponentFixture<RegisteraddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteraddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteraddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
