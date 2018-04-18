import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms/';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseClaimsService } from '../expense-claims.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseClaim } from '../models/expense-claim';
import * as moment from 'moment';
import { NewExpenseClaim } from '../models/new-expense-claim';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-content',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  public isWaiting: boolean;
  public isError: boolean;
  public message: string;

  description = new FormControl('', [Validators.required]);
  expenses_start_date = new FormControl('', [Validators.required]);
  company = new FormControl('', [Validators.required]);

  newExpenseForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private expensesClaimService: ExpenseClaimsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.isError = false;
    this.isWaiting = false;
    this.message = 'Unable to create new expense claim';

    this.newExpenseForm = this.formBuilder.group({
      description: this.description,
      company: this.company,
      expenses_start_date: this.expenses_start_date
    });
  }

  addNew() {
    this.expensesClaimService
      .newClaim(
        new NewExpenseClaim({
          description: this.description.value,
          claimDate: moment(this.expenses_start_date.value).utc().format(),
          company: this.company.value
        })
      )
      .subscribe(
        result => {
          this.activeModal.close({ save: true, id: result.id });
          this.isWaiting = false;
        },
        error => {
          this.message = 'Unable to create new expense claim';
          this.isError = true;
          this.isWaiting = false;
        }
      );
  }

  isInvalidOrWaiting(): boolean {
    return this.isWaiting || !this.newExpenseForm.valid;
  }
}
