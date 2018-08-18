import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { takeWhile } from 'rxjs/operators';
import { ExpensesSummary } from '../../models/expenses-summary';
import * as expenseActions from '../../state/expense.actions';
import * as fromExpenses from '../../state/expenses.reducer';
import { NewExpenseComponent } from '../new-expense/new-expense.component';

@Component({
  selector: 'app-expense-claims',
  templateUrl: './expense-claims.component.html',
  styleUrls: ['./expense-claims.component.scss']
})
export class ExpenseClaimsComponent implements OnInit, OnDestroy {
  summary: ExpensesSummary;
  componentActive = true;

  // todo: add logger
  constructor(
    private store: Store<fromExpenses.State>,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public router: Router
  ) {}

  // todo: add toast
  ngOnInit() {
    this.store.dispatch(new expenseActions.RequestAllExpenses());

    this.store
      .pipe(
        select(fromExpenses.getExpensesSummary),
        takeWhile(() => this.componentActive)
      )
      .subscribe(expensesSummary => {
        this.summary = new ExpensesSummary(expensesSummary);
      });

    this.store.pipe(select(fromExpenses.getError)).subscribe(message => {
      if (message !== '') {
        this.toastr.error(message, 'Error');
      }
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
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
