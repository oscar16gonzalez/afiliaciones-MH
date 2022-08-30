import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoMembershipComponent } from './modal-info-membership.component';

describe('ModalInfoMembershipComponent', () => {
  let component: ModalInfoMembershipComponent;
  let fixture: ComponentFixture<ModalInfoMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
