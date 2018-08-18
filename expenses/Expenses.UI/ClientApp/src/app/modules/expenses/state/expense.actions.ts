import { Action } from '@ngrx/store';
import { ExpensesSummary } from '../models/expenses-summary';

export enum ExpenseActionTypes {
  RequestExpenses = '[Expenses] Request Expenses',
  RequestExpensesSuccess = '[Expenses] Request Expenses Success',
  RequestExpensesFail = '[Expenses] Request Expenses Fail',
  RequestExpense = '[Expenses] Request Expense',
  RequestExpenseSuccess = '[Expenses] Request Expense Success',
  RequestExpenseFail = '[Expenses] Request Expense Fail'
}

/* istanbul ignore next */
export class RequestAllExpenses implements Action {
  readonly type = ExpenseActionTypes.RequestExpenses;

  constructor() {}
}

/* istanbul ignore next */
export class RequestAllExpensesSuccess implements Action {
  readonly type = ExpenseActionTypes.RequestExpensesSuccess;

  constructor(public payload: ExpensesSummary) {}
}

/* istanbul ignore next */
export class RequestAllExpensesFailed implements Action {
  readonly type = ExpenseActionTypes.RequestExpensesFail;

  constructor(public payload: string) {}
}

/* istanbul ignore next */
export class RequestExpense implements Action {
  readonly type = ExpenseActionTypes.RequestExpense;

  constructor(public payload: number) {}
}

/* istanbul ignore next */
export type ExpenseActions = RequestAllExpenses | RequestAllExpensesSuccess | RequestAllExpensesFailed | RequestExpense;

// import { Injectable } from '@angular/core';
// import { IAppState } from '../../../store';
// import { ErrorState } from '../../shared/ErrorState';
// import { LoggingService } from '../../shared/services/logging.service';
// import { ExpenseClaimsService } from '../services/expense-claims.service';

// export const FILTER_EXPENSES = 'expenses/FILTER';
// export const REQUEST_EXPENSES = 'expenses/REQUEST_EXPENSES';
// export const REQUEST_EXPENSE = 'expenses/REQUEST_EXPENSE';
// export const REQUEST_ERROR = 'expenses/REQUEST_ERROR';

// @Injectable()
// export class ExpenseActions {
//   constructor(private ngRedux: NgRedux<IAppState>, private expensesClaimsService: ExpenseClaimsService, private logger: LoggingService) {}

//   getExpenseSummary() {
//     this.expensesClaimsService.claims().subscribe(
//       expenseClaims => {
//         this.ngRedux.dispatch({
//           type: REQUEST_EXPENSES,
//           expenseClaims
//         });
//       },
//       (error: string) => {
//         this.logger.info('error');
//         this.ngRedux.dispatch({
//           type: REQUEST_ERROR,
//           error: new ErrorState({ message: error })
//         });
//       }
//     );
//   }

//   @dispatch()
//   filterExpenses = (filterDate: Date) => ({
//     type: FILTER_EXPENSES,
//     filterDate
//   // tslint:disable-next-line:semicolon
//   });

//   getExpenseClaim(id: number) {
//     this.expensesClaimsService.claim(id).subscribe(
//       expenseClaim => {
//         this.ngRedux.dispatch({
//           type: REQUEST_EXPENSE,
//           id: id,
//           expenseClaim
//         });
//       },
//       error => {
//         this.logger.info('error');
//         // dispatch to error reducer
//       }
//     );
//   }
// }

// /* , error => {
//       this.ngRedux.dispatch({
//         type: 'expenses/REQUEST_EXPENSES_FAIL'
//       });
//       throw error;
//     } */
