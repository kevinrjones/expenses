import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ExpenseClaim } from './models/expense-claim';
import { AppConfig } from '../../shared/projectConfigShared';
import { ProjectConfig } from '../../shared/projectConfig';
import { ExpensesSummary } from './models/expenses-summary';

@Injectable()
export class ExpenseClaimsService {

  url: string;

  constructor(private _http: HttpClient,
    @Inject(AppConfig) config: ProjectConfig) {
    this.url = `${config.rootUrl}${config.expensesUrl}`;
  }

  public claims(): Observable<ExpensesSummary> {
    return this._http.get<ExpensesSummary>(this.url, {});
  }

  public newClaim(): Observable<ExpenseClaim> {
    return this._http.post<ExpenseClaim>(this.url, {});
  }
}
