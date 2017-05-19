/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FhirCodesComponent } from './fhir-codes.component';

describe('FhirCodesComponent', () => {
  let component: FhirCodesComponent;
  let fixture: ComponentFixture<FhirCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhirCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
