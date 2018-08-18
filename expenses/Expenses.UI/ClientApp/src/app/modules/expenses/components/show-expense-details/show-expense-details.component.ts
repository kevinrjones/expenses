import { Component, OnInit } from '@angular/core';
import { ExpenseClaim } from '../../models/expense-claim';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-expense-details',
  templateUrl: './show-expense-details.component.html',
  styleUrls: ['./show-expense-details.component.scss']
})
export class ShowExpenseDetailsComponent implements OnInit {
  claim: ExpenseClaim;
  id = -1;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // @select('expenseClaim') store: Observable<ExpenseClaim>;

  // constructor(private ngRedux: NgRedux<IAppState>, private expenseActions: ExpenseActions, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.store.subscribe((claim: ExpenseClaim) => {
  //     if (this.id !== -1) {
  //       this.claim = new ExpenseClaim(claim);
  //     }
  //   });

  //   // todo: mock paraam map
  //   this.route.paramMap.subscribe(map => {
  //     this.id = +map.get('id');
  //     this.expenseActions.getExpenseClaim(this.id);
  //   });
  // }
}
