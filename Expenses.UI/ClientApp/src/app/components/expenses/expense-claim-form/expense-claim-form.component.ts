import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../store';
import { ExpensesSummary } from '../models/expenses-summary';
import { Observable } from 'rxjs/Observable';
import { ExpenseActions } from '../expense.actions';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NewExpenseFormComponent } from '../new-expense-form/new-expense-form.component';

@Component({
  selector: 'app-expense-claim-form',
  templateUrl: './expense-claim-form.component.html',
  styleUrls: ['./expense-claim-form.component.scss']
})
export class ExpenseClaimFormComponent implements OnInit {
  @select('expenseClaims') store: Observable<ExpensesSummary>;
  summary: ExpensesSummary;

  constructor(private ngRedux: NgRedux<IAppState>, private expenseActions: ExpenseActions, private modalService: NgbModal) {}


  ngOnInit() {
    this.expenseActions.getExpenseSummary();

    // todo: is this best way to do this and handle errors
    // or simply use | async in the HTML?
    this.store.subscribe(
      (claims: ExpensesSummary) => {
        this.summary = new ExpensesSummary(claims);
      },
    );
  }

  newClaim() {
    const modalRef: NgbModalRef = this.modalService.open(NewExpenseFormComponent, {
      windowClass: 'expense-detaiks'
    });
    modalRef.result.then(
      res => {
        if (res.save) {
          // this.toastr.success('Created a new claim', 'Success');
          // 3 == id - get this when creating the new claim
          // this.router.navigate(['/expenses', res.id]);
        }
      },
      () => {}
    ); // empty 'reject' function - workaround for https://github.com/shlomiassaf/angular2-modal/issues/188
  }

}
