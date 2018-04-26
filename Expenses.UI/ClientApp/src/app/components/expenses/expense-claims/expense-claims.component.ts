import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExpenseClaimsService } from '../expense-claims.service';
import { ExpenseClaim } from '../models/expense-claim';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import { ExpensesSummary } from '../models/expenses-summary';
import { NewExpenseComponent } from '../new-expense/new-expense.component';
import { ToastsManager } from 'ng2-toastr';
import { IAppState } from '../../../store';
import { Observable } from 'rxjs/Observable';
import { ExpenseActions } from '../expense.actions';
import { select, NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-expense-claims',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit {
  @select('expenseClaims') store: Observable<ExpensesSummary>;
  summary: ExpensesSummary;

  // todo: add logger
  // todo: inject store helper, should not be accessing claims directly from the service
  constructor(private ngRedux: NgRedux<IAppState>, private expenseActions: ExpenseActions, private modalService: NgbModal, public toastr: ToastsManager, public router: Router) {}

  // todo: add toast
  ngOnInit() {

    this.store.subscribe(
      (claims: ExpensesSummary) => {
        this.summary = new ExpensesSummary(claims);
      },
      error => this.toastr.error('Unable to get expense claims', 'Error')
    );

    this.expenseActions.getExpenseSummary();
    // todo: is this best way to do this and handle errors
    // or simply use | async in the HTML?
  }

  newClaim() {
    const modalRef: NgbModalRef = this.modalService.open(NewExpenseComponent, {
      windowClass: 'expense-detaiks'
    });
    modalRef.result.then(
      res => {
        if (res.save) {
          this.toastr.success('Created a new claim', 'Success');
          // 3 == id - get this when creating the new claim
          this.router.navigate(['/expenses', res.id]);
        }
      },
      () => {}
    ); // empty 'reject' function - workaround for https://github.com/shlomiassaf/angular2-modal/issues/188
  }
}
