import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserSystemComponent } from './list-user-system.component';

describe('ListUserSystemComponent', () => {
  let component: ListUserSystemComponent;
  let fixture: ComponentFixture<ListUserSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
