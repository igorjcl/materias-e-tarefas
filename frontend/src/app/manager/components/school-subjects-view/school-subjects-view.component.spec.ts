import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSubjectsViewComponent } from './school-subjects-view.component';

describe('SchoolSubjectsViewComponent', () => {
  let component: SchoolSubjectsViewComponent;
  let fixture: ComponentFixture<SchoolSubjectsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolSubjectsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSubjectsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
