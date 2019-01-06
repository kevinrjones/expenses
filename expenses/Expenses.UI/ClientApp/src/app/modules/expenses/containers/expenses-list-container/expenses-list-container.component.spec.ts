import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesListContainerComponent } from './expenses-list-container.component';

describe('ExpensesListContainerComponent', () => {
  let component: ExpensesListContainerComponent;
  let fixture: ComponentFixture<ExpensesListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
