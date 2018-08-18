import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoggingService } from '../../shared/services/logging.service';
import { ExpenseClaimsService } from '../services/expense-claims.service';
import * as expenseActions from './expense.actions';

@Injectable()
export class ExpensesEffects {
  constructor(private actions: Actions, private expensesService: ExpenseClaimsService, private logger: LoggingService) {}

  @Effect()
  loadExpenseSummary = this.actions.pipe(
    ofType(expenseActions.ExpenseActionTypes.RequestExpenses),
    mergeMap((action: expenseActions.ExpenseActionTypes.RequestExpenses) =>
      this.expensesService.claims().pipe(
        map(result => new expenseActions.RequestAllExpensesSuccess(result)),
        catchError(err => of(new expenseActions.RequestAllExpensesFailed(this.handleError(err))))
      )
    )
  );

  private handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      // istanbul ignore next
      this.logger.error(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.logger.error(`Backend returned code ${error.status},  body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return 'There was an error. Please report this to technical support.';
  }

}
