import { Injectable } from '@angular/core';
import { ExpenseItem } from './expense-item';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ExpenseClaim } from './expense-claim';

@Injectable()
export class ExpensesService {

  expenseClaims: Array<ExpenseItem>

  constructor() { 
    this.expenseClaims = new Array<ExpenseClaim>()
    this.expenseClaims.push(new ExpenseClaim({id: 1, description: "Claim 1"}))
    this.expenseClaims.push(new ExpenseClaim({id: 2, description: "Claim 2"}))
  }

  // public items() : Observable<Array<ExpenseItem>> {
  //   return Observable.of(this.expenseItems)
  // }

  public claims() : Observable<Array<ExpenseItem>> {
    return Observable.of(this.expenseClaims)
  }
}
