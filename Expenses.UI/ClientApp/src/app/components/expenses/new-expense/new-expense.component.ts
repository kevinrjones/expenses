import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms/';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseClaimsService } from '../expenses-claims.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ExpenseClaim } from '../models/expense-claim';

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
  public companies: Array<String>;

  description = new FormControl('', [Validators.required]);
  expenses_start_date = new FormControl('', [Validators.required]);
  company = new FormControl('', [Validators.required]);

  newExpenseForm: FormGroup;

  // todo: userservice to get the companies the user claims for
  constructor(
    public activeModal: NgbActiveModal,
    private expensesClaimService: ExpenseClaimsService,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager
  ) {
    this.companies = ['Google', 'Microsoft'];
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
    console.log('new expense');
    this.expensesClaimService
      .newClaim(
        new ExpenseClaim({
          description: this.description.value,
          claimDateUtc: this.expenses_start_date.value,
          company: this.company.value
        })
      )
      .subscribe(
        result => {
          this.activeModal.close({ Save: true });
          this.isWaiting = false;
          this.toastr.success('Expense creation succeeded', 'Success');
        },
        error => {
          this.message = 'Unable to create new expense claim';
          this.isError = true;
          this.isWaiting = false;
          this.toastr.error('Expense creation failed', 'Error');
        }
      );
  }

  isInvalidOrWaiting(): boolean {
    return this.isWaiting || !this.newExpenseForm.valid;
  }
}
