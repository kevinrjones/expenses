import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseClaimsComponentComponent } from './expense-claims-component.component';

describe('ExpenseClaimsComponentComponent', () => {
  let component: ExpenseClaimsComponentComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseClaimsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseClaimsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
