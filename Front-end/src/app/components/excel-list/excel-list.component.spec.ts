import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelListComponent } from './excel-list.component';

describe('ExcelListComponent', () => {
  let component: ExcelListComponent;
  let fixture: ComponentFixture<ExcelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
