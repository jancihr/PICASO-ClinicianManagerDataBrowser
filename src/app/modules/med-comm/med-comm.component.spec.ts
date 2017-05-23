import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedCommComponent } from './med-comm.component';

describe('MedCommComponent', () => {
  let component: MedCommComponent;
  let fixture: ComponentFixture<MedCommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedCommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
