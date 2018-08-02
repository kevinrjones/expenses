import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseClaimsService } from '../../services/expense-claims.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './add-expense-details.component.html',
  styleUrls: ['./add-expense-details.component.scss']
})
export class AddExpenseDetailsComponent implements OnInit {
  addExpenseForm: FormGroup;

  constructor(private expensesClaimService: ExpenseClaimsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
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
    const controls = <FormArray>this.addExpenseForm.controls['itemRows'];
    controls.removeAt(index);
  }

  updateRow(rowIndex: number) {
    const row = this.itemRows.at(rowIndex) as FormGroup;
    row.controls.total.setValue(row.controls.amount.value + row.controls.tax.value);
  }

  shouldShowAddButton(rowIndex: number): boolean {
    return rowIndex === this.itemRows.length - 1;
  }
}
