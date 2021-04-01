import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentDataComponent } from './add-student-data.component';

describe('AddStudentDataComponent', () => {
  let component: AddStudentDataComponent;
  let fixture: ComponentFixture<AddStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
