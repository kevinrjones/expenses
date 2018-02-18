import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseItem } from '../../services/expense-item';
import { ExpenseClaim } from '../../services/expense-claim';

@Component({
  selector: 'app-expense-claims-component',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit {

  claims: Array<ExpenseClaim>;

  // todo: add logger
  constructor(private expensesService: ExpensesService ) { }

  // todo: add toast  
  ngOnInit() {
    this.expensesService.claims().subscribe(
      (claims) => this.claims = claims,
      (error) => console.error(error)
    )
  }

}
