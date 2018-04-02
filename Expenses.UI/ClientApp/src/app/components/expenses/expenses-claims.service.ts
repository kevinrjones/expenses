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

  public claims() {
    return this._http.get<ExpensesSummary>(this.url, {})
        .do(data => {
          this.storeHelper.update('summary', data);
        }); // .error?
  }

  public newClaim(claim: NewExpenseClaim): Observable<ExpenseClaim> {
    return this._http.post<ExpenseClaim>(this.url, claim);
  }
}
