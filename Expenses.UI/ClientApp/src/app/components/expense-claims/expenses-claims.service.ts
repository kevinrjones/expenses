import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ExpenseClaim } from '../../models/expense-claim';
import { AppConfig } from '../../shared/projectConfigShared';
import { ProjectConfig } from '../../shared/projectConfig';

@Injectable()
export class ExpenseClaimsService {

  url: string;
  expenseClaims: ExpenseClaim

  constructor(private _http: HttpClient,
    @Inject(AppConfig) config: ProjectConfig) {
    this.url = `${config.rootUrl}${config.expensesUrl}`;
  }

  public claims(): Observable<Array<ExpenseClaim>> {
    return this._http.get<Array<ExpenseClaim>>(this.url, {});
  }
}
