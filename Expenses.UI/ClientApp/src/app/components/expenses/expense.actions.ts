import { IAppState } from '../../store';
import { Injectable } from '@angular/core';
import { ExpenseClaimsService } from './expense-claims.service';
import { NgRedux, dispatch } from '@angular-redux/store';
import { RootStore } from '@angular-redux/store/lib/src/components/root-store';

export const FILTER_EXPENSES = 'expenses/FILTER';
export const REQUEST_EXPENSES = 'expenses/REQUEST_EXPENSES';

@Injectable()
export class ExpenseActions {
  constructor(private ngRedux: NgRedux<IAppState>, private expensesClaimsService: ExpenseClaimsService) {}

  getExpenseSummary() {
    this.expensesClaimsService.claims().subscribe(expenseClaims => {
      this.ngRedux.dispatch({
        type: REQUEST_EXPENSES,
        expenseClaims
      });
    });
  }

  @dispatch()
  filterExpenses = (filterDate: Date) => ({
    type: FILTER_EXPENSES, filterDate
  })
}

/* , error => {
      this.ngRedux.dispatch({
        type: 'expenses/REQUEST_EXPENSES_FAIL'
      });
      throw error;
    } */
