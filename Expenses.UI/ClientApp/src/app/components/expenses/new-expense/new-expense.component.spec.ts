import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewExpenseComponent } from './new-expense.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseClaimsService } from '../expenses-claims.service';
import { AppConfig } from '../../../shared/projectConfigShared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr';

describe('NewExpenseComponent', () => {
  let component: NewExpenseComponent;
  let fixture: ComponentFixture<NewExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpenseComponent ],
      providers: [
        {
          provide: NgbActiveModal, value: {}
        },
        ExpenseClaimsService,
        {
          provide: AppConfig,
          useValue: {}
        }
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgbModule.forRoot(),
        ToastModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if no values are set', () => {
    component.newExpenseForm.controls.description.setValue('');
    component.newExpenseForm.controls.company.setValue('');
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the description is not set', () => {
    component.newExpenseForm.controls.description.setValue('');
    component.newExpenseForm.controls.company.setValue('ff');
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the company is not set', () => {
    component.newExpenseForm.controls.description.setValue('ff');
    component.newExpenseForm.controls.company.setValue('');
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be valid if all values set', () => {
    component.newExpenseForm.controls.description.setValue('ff');
    component.newExpenseForm.controls.company.setValue('dd');
    expect(component.newExpenseForm.valid).toBeTruthy();
  });

});
