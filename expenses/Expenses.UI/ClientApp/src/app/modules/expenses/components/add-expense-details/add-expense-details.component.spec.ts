import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpenseClaimsService } from '../../services/expense-claims.service';
import { AddExpenseDetailsComponent } from './add-expense-details.component';


describe('AddExpenseDetailsComponent', () => {
  let component: AddExpenseDetailsComponent;
  let fixture: ComponentFixture<AddExpenseDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [
          ExpenseClaimsService,
          {
            provide: AppConfig,
            useValue: {}
          }
        ],
        imports: [HttpClientTestingModule, ReactiveFormsModule],
        declarations: [AddExpenseDetailsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialised with one row', () => {
    expect(component.itemRows.length).toBe(1);
  });

  it('should be invalid if no values are set', () => {
    component.addExpenseForm.setValue({
      itemRows: [{ description: '', amount: null, tax: 0, total: 0 }]
    });
    expect(component.addExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the description is not set', () => {
    component.addExpenseForm.setValue({
      itemRows: [{ description: '', amount: 10, tax: 0, total: 0 }]
    });
    expect(component.addExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the amount is not set', () => {
    component.addExpenseForm.setValue({
      itemRows: [{ description: 'sss', amount: 0, tax: 0, total: 0 }]
    });
    expect(component.addExpenseForm.valid).not.toBeTruthy();
  });

  it('should be valid if all values are set', () => {
    component.addExpenseForm.setValue({
      itemRows: [{ description: 'sss', amount: 0.01, tax: 0, total: 0 }]
    });
    expect(component.addExpenseForm.valid).toBeTruthy();
  });

  it('should be an invalid row if no values are set', () => {
    const row = component.initItemRows();
    expect(row.valid).not.toBeTruthy();
  });

  it('should be an invalid row if the description is not set', () => {
    const row = component.initItemRows();
    row.controls.amount.setValue(10);
    expect(row.valid).not.toBeTruthy();
  });

  it('should be an invalid row if the amount is not set', () => {
    const row = component.initItemRows();
    row.controls.description.setValue('vvv');
    expect(row.valid).not.toBeTruthy();
  });

  it('should be a valid row if all values are set', () => {
    const row = component.initItemRows();
    row.controls.description.setValue('sss');
    row.controls.amount.setValue(10);
    expect(row.valid).toBeTruthy();
  });

  it('should be not able to add a row if the form is invalid', () => {
    component.addNewRow();
    expect(component.itemRows.length).toBe(1);
  });

  it('should be able to add a row if the form is valid', () => {
    component.addExpenseForm.setValue({
      itemRows: [{ description: 'sss', amount: 1, tax: 0, total: 0 }]
    });
    component.addNewRow();
    expect(component.itemRows.length).toBe(2);
  });

  it('should set to be the sum of the amount and the tax when updating the row', () => {
    component.addExpenseForm.setValue({
      itemRows: [{ description: 'sss', amount: 10, tax: 1, total: 0 }]
    });
    const group = component.itemRows.at(0) as FormGroup;
    component.updateRow(0);
    expect(group.controls.total.value).toBe(11);
  });

  it('should remove a control from the FormGroup when deleting a control', () => {
    const controls = <FormArray>component.addExpenseForm.controls['itemRows'];
    expect(controls.length).toBe(1);
    component.deleteRow(0);
    expect(controls.length).toBe(0);
  });

});
