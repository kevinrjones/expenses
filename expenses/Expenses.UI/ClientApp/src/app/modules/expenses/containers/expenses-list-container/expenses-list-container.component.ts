import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { NewExpenseComponent } from '../../components/new-expense/new-expense.component';
import { ExpensesSummary } from '../../models/expenses-summary';
import * as expenseActions from '../../state/expense.actions';
import * as fromExpenses from '../../state/expenses.reducer';

@Component({
  selector: 'app-expenses-list-container',
  templateUrl: './expenses-list-container.component.html',
  styleUrls: ['./expenses-list-container.component.scss']
})
export class ExpensesListContainerComponent implements OnInit, OnDestroy {

  summary: Observable<ExpensesSummary>;
  error: Observable<string>;

  // todo: add logger
  constructor(
    private store: Store<fromExpenses.State>,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public router: Router
  ) {}

  // todo: add toast
  ngOnInit() {
    this.summary = this.store
      .pipe(
        select(fromExpenses.getExpensesSummary)
      );

      this.store
      .select(fromExpenses.getHasLoaded)
      .filter(isLoaded => !isLoaded)
      .subscribe(_ => this.store.dispatch(new expenseActions.RequestAllExpenses()));


    this.error = this.store.pipe(select(fromExpenses.getError));
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
