import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSubjectsEditComponent } from './school-subjects-edit.component';

describe('SchoolSubjectsEditComponent', () => {
  let component: SchoolSubjectsEditComponent;
  let fixture: ComponentFixture<SchoolSubjectsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolSubjectsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSubjectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
