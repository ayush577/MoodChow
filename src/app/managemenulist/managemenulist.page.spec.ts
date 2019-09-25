import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemenulistPage } from './managemenulist.page';

describe('ManagemenulistPage', () => {
  let component: ManagemenulistPage;
  let fixture: ComponentFixture<ManagemenulistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemenulistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemenulistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
