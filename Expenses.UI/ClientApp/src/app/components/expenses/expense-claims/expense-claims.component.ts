import { Component, OnInit } from '@angular/core';
import { ExpenseClaimsService } from '../expenses-claims.service';
import { ExpenseClaim } from '../models/expense-claim';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import { ExpensesSummary } from '../models/expenses-summary';
import { NewExpenseComponent } from '../new-expense/new-expense.component';

@Component({
  selector: 'app-expense-claims',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit {
  summary: ExpensesSummary;

  // todo: add logger
  constructor(
    private expensesService: ExpenseClaimsService,
    private _modalService: NgbModal
  ) {
    this.summary = new ExpensesSummary();
  }

  // todo: add toast
  ngOnInit() {
    this.expensesService.claims().subscribe(
      (claims: ExpensesSummary) => {
        this.summary = new ExpensesSummary(claims);
      },
      error => console.error(error)
    );
  }

  newClaim() {
    console.log('Create new claim');
    const modalRef: NgbModalRef = this._modalService.open(NewExpenseComponent, {
      windowClass: 'expense-detaiks'
    });
    modalRef.result.then(
      res => {
        console.log(res);
      },
      () => {}
    ); // empty 'reject' function - workaround for https://github.com/shlomiassaf/angular2-modal/issues/188
  }
}
