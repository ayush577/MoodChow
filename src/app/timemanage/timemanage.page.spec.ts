import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimemanagePage } from './timemanage.page';

describe('TimemanagePage', () => {
  let component: TimemanagePage;
  let fixture: ComponentFixture<TimemanagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimemanagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimemanagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
