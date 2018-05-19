import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ErrorState } from '../../../shared/ErrorState';
import { IAppState } from '../../../store';
import { ExpenseActions } from '../expense.actions';
import { ExpensesSummary } from '../models/expenses-summary';
import { NewExpenseComponent } from '../new-expense/new-expense.component';

@Component({
  selector: 'app-expense-claims',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit {
  @select('expenseClaims') store: Observable<ExpensesSummary>;
  @select('error') error: Observable<ErrorState>;
  summary: ExpensesSummary;

  // todo: add logger
  // todo: inject store helper, should not be accessing claims directly from the service
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private expenseActions: ExpenseActions,
    private modalService: NgbModal,
    public toastr: ToastsManager,
    public router: Router
  ) {}

  // todo: add toast
  ngOnInit() {
    this.expenseActions.getExpenseSummary();

    this.store.subscribe((claims: ExpensesSummary) => {
      this.summary = new ExpensesSummary(claims);
    });
    this.error.subscribe((errorState: ErrorState) => {
      if (errorState.message !== undefined) {
        this.toastr.error(errorState.message, 'Error');
      }
    });
  }

  newClaim() {
    const modalRef: NgbModalRef = this.modalService.open(NewExpenseComponent, {
      windowClass: 'expense-details'
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
