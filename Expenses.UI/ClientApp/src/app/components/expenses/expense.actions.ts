import { NgRedux, dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ErrorState } from '../../shared/ErrorState';
import { IAppState } from '../../store';
import { ExpenseClaimsService } from './expense-claims.service';

export const FILTER_EXPENSES = 'expenses/FILTER';
export const REQUEST_EXPENSES = 'expenses/REQUEST_EXPENSES';
export const REQUEST_EXPENSE = 'expenses/REQUEST_EXPENSE';
export const REQUEST_ERROR = 'expenses/REQUEST_ERROR';

@Injectable()
export class ExpenseActions {
  constructor(private ngRedux: NgRedux<IAppState>, private expensesClaimsService: ExpenseClaimsService) {}

  getExpenseSummary() {
    this.expensesClaimsService.claims().subscribe(
      expenseClaims => {
        this.ngRedux.dispatch({
          type: REQUEST_EXPENSES,
          expenseClaims
        });
      },
      (error: string) => {
        console.log('error');
        this.ngRedux.dispatch({
          type: REQUEST_ERROR,
          error: new ErrorState({message: error})
        });
      }
    );
  }

  @dispatch()
  filterExpenses = (filterDate: Date) => ({
    type: FILTER_EXPENSES,
    filterDate
  });

  getExpenseClaim(id: number) {
    this.expensesClaimsService.claim(id).subscribe(expenseClaim => {
      this.ngRedux.dispatch({
        type: REQUEST_EXPENSE,
        id: id,
        expenseClaim
      });
    },
    error => {
      console.log('error');
      // dispatch to error reducer
    });
  }
}

/* , error => {
      this.ngRedux.dispatch({
        type: 'expenses/REQUEST_EXPENSES_FAIL'
      });
      throw error;
    } */
