import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSubjectsCreateComponent } from './school-subjects-create.component';

describe('SchoolSubjectsCreateComponent', () => {
  let component: SchoolSubjectsCreateComponent;
  let fixture: ComponentFixture<SchoolSubjectsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolSubjectsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSubjectsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
