import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenseFormComponent } from './new-expense-form.component';

describe('NewExpenseFormComponent', () => {
  let component: NewExpenseFormComponent;
  let fixture: ComponentFixture<NewExpenseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpenseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
