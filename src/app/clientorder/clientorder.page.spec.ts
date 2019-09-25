import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientorderPage } from './clientorder.page';

describe('ClientorderPage', () => {
  let component: ClientorderPage;
  let fixture: ComponentFixture<ClientorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
