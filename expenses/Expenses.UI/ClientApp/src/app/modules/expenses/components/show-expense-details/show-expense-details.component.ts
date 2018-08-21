import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ExpenseClaim } from '../../models/expense-claim';
import * as expenseActions from '../../state/expense.actions';
import * as fromExpenses from '../../state/expenses.reducer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-expense-details',
  templateUrl: './show-expense-details.component.html',
  styleUrls: ['./show-expense-details.component.scss']
})
export class ShowExpenseDetailsComponent implements OnInit, OnDestroy {
  claim: ExpenseClaim;
  id = -1;
  componentActive = true;

  constructor(private store: Store<fromExpenses.State>, private route: ActivatedRoute) {
    this.claim = new ExpenseClaim();
  }

  ngOnInit() {

    this.store.pipe(
      select(fromExpenses.getCurrentExpenseClaim),
      takeWhile(() => this.componentActive))
      .subscribe(claim => {
        this.claim = new ExpenseClaim(claim);
      });

      this.route.paramMap.subscribe(map => {
        this.id = +map.get('id');
        this.store.dispatch(new expenseActions.RequestSingleExpense(this.id));
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
