import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageorderPage } from './manageorder.page';

describe('ManageorderPage', () => {
  let component: ManageorderPage;
  let fixture: ComponentFixture<ManageorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
