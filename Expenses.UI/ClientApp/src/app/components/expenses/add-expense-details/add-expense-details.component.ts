import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ExpenseClaimsService } from '../expense-claims.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../store';
import { NgRedux, select } from '@angular-redux/store';
import { ExpenseClaim } from '../models/expense-claim';
import { ExpensesSummary } from '../models/expenses-summary';
import { ExpenseActions } from '../expense.actions';

@Component({
  selector: 'app-expense-details',
  templateUrl: './add-expense-details.component.html',
  styleUrls: ['./add-expense-details.component.scss']
})
export class AddExpenseDetailsComponent implements OnInit {
  addExpenseForm: FormGroup;
  claim: ExpenseClaim;
  id = -1;
  @select('expenseClaims') store: Observable<ExpensesSummary>;

  constructor(private ngRedux: NgRedux<IAppState>, private expenseActions: ExpenseActions, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.subscribe((summary: ExpensesSummary) => {
      if (this.id !== -1) {
        this.claim = summary.claims[this.id - 1];
      }
    });

    this.route.paramMap.subscribe(map => {
      this.id = +map.get('id');
      this.expenseActions.getExpenseSummary();
    });

    this.addExpenseForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this.formBuilder.group({
      // list all your form controls here, which belongs to your form array
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0.01)]),
      tax: new FormControl(''),
      total: new FormControl('')
    });
  }

  public get isValidForm(): boolean {
    return this.addExpenseForm.valid;
  }

  public isValidRow(rowIndex: number): boolean {
    const row = this.itemRows.at(rowIndex) as FormGroup;
    return row.valid;
  }

  get itemRows(): FormArray {
    return this.addExpenseForm.get('itemRows') as FormArray;
  }

  addNewRow() {
    if (this.isValidForm === true) {
      this.itemRows.push(this.initItemRows());
    }
  }

  deleteRow(index: number) {
    const control = <FormArray>this.addExpenseForm.controls['itemRows'];
    control.removeAt(index);
  }

  updateRow(rowIndex: number) {
    const row = this.itemRows.at(rowIndex) as FormGroup;
    row.controls.total.setValue(row.controls.amount.value + row.controls.tax.value);
  }

  shouldShowAddButton(rowIndex: number): boolean {
    return rowIndex === this.itemRows.length - 1;
  }
}
