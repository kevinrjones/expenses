import { Component, OnInit } from '@angular/core';
import { ExpenseClaimsService } from '../expenses-claims.service';
import { ExpenseClaim } from '../models/expense-claim';
import 'rxjs/add/operator/map'
import { ExpensesSummary } from '../models/expenses-summary';

@Component({
  selector: 'app-expense-claims',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit {

  summary: ExpensesSummary;

  // todo: add logger
  constructor(private expensesService: ExpenseClaimsService) { }

  // todo: add toast
  ngOnInit() {

    this.expensesService.claims()
      .subscribe(
        (claims: ExpensesSummary) => {
          this.summary = new ExpensesSummary(claims);
        },
        (error) => console.error(error)
      );
  }

  newClaim() {
    console.log('Create new claim');
  }
}
