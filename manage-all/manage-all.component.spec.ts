import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllComponent } from './manage-all.component';

describe('ManageAllComponent', () => {
  let component: ManageAllComponent;
  let fixture: ComponentFixture<ManageAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
