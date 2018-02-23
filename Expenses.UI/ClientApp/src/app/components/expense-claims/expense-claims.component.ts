import { Component, OnInit } from '@angular/core';
import { ExpenseClaimsService } from './expenses-claims.service';
import { ExpenseClaim } from '../../models/expense-claim';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-expense-claims',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit {

  claims: Array<ExpenseClaim>;

  // todo: add logger
  constructor(private expensesService: ExpenseClaimsService) { }

  // todo: add toast  
  ngOnInit() {
    
    this.expensesService.claims()
      .subscribe(
        (claims: Array<ExpenseClaim>) => {
          this.claims = claims.map(c => new ExpenseClaim(c))
        },
        (error) => console.error(error)
      )
  }

}
