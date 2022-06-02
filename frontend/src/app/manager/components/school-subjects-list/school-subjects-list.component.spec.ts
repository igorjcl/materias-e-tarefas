import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSubjectsListComponent } from './school-subjects-list.component';

describe('SchoolSubjectsListComponent', () => {
  let component: SchoolSubjectsListComponent;
  let fixture: ComponentFixture<SchoolSubjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolSubjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSubjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
