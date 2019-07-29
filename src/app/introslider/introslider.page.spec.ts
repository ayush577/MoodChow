import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrosliderPage } from './introslider.page';

describe('IntrosliderPage', () => {
  let component: IntrosliderPage;
  let fixture: ComponentFixture<IntrosliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrosliderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrosliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
