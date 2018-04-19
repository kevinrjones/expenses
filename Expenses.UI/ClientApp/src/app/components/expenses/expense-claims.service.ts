import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ExpenseClaim } from './models/expense-claim';
import { AppConfig } from '../../shared/projectConfigShared';
import { ProjectConfig } from '../../shared/projectConfig';
import { ExpensesSummary } from './models/expenses-summary';
import { StoreHelper } from '../../shared/store/store-helper';
import { NewExpenseClaim } from './models/new-expense-claim';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExpenseClaimsService {
  url: string;

  constructor(
    private storeHelper: StoreHelper,
    private _http: HttpClient,
    @Inject(AppConfig) config: ProjectConfig
  ) {
    this.url = `${config.rootUrl}${config.expensesUrl}`;
  }

  public claims(): Observable<ExpensesSummary | ErrorObservable> {
    return this._http.get<ExpensesSummary>(this.url, {})
        .do((data: ExpensesSummary) => {
          this.storeHelper.update('summary', data);
        })
        .pipe(catchError(this.handleError));
  }

  public newClaim(claim: NewExpenseClaim): Observable<ExpenseClaim> {
    return this._http.post<ExpenseClaim>(this.url, claim)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'There was an error. Please report this to technical support.');
  }
}
§