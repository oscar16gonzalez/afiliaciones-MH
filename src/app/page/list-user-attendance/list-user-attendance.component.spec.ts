import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAttendanceComponent } from './list-user-attendance.component';

describe('ListUserAttendanceComponent', () => {
  let component: ListUserAttendanceComponent;
  let fixture: ComponentFixture<ListUserAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
