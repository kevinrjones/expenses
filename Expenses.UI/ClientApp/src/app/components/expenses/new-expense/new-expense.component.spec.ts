import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewContainerRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { AppConfig } from '../../../shared/projectConfigShared';
import { asyncData, asyncError } from '../../../testing/helpers';
import { ExpenseClaimsService } from '../expense-claims.service';
import { NewExpenseComponent } from './new-expense.component';



describe('NewExpenseComponent', () => {
  let component: NewExpenseComponent;
  let fixture: ComponentFixture<NewExpenseComponent>;
  let expenseClaimsService: ExpenseClaimsService;
  let activeModal: NgbActiveModal;
  let toastrService: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpenseComponent ],
      providers: [
        NgbActiveModal,
        ExpenseClaimsService,
        {
          provide: AppConfig,
          useValue: {}
        },
        ViewContainerRef
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);
    activeModal = TestBed.get(NgbActiveModal);
    toastrService = TestBed.get(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if no values are set', () => {
    component.newExpenseForm.setValue({description: '', company: '', expenses_start_date: null});
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the description is not set', () => {
    component.newExpenseForm.setValue({description: '', company: 'ff', expenses_start_date: {year: 2017, month: 5, day: 13}});
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the company is not set', () => {
    component.newExpenseForm.setValue({description: 'ff', company: '', expenses_start_date: {year: 2017, month: 5, day: 13}});
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be invalid if the date is not set', () => {
    component.newExpenseForm.setValue({description: 'ff', company: 'dd', expenses_start_date: null});
    expect(component.newExpenseForm.valid).not.toBeTruthy();
  });

  it('should be valid if all values set', () => {
    component.newExpenseForm.setValue({description: 'ff', company: 'dd', expenses_start_date: {year: 2017, month: 5, day: 13}});
    expect(component.newExpenseForm.valid).toBeTruthy();
  });

  it('should add the new claim when asked', fakeAsync(() => {
    spyOn(expenseClaimsService, 'newClaim').and
        .returnValue(
          asyncData({})
        );
    component.addNew();
    expect(expenseClaimsService.newClaim).toHaveBeenCalled();
  }));

  it('should add close the active modal when a new claim is sucesfully added', fakeAsync(() => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(asyncData({}));
    spyOn(activeModal, 'close');
    component.addNew();
    tick();
    expect(activeModal.close).toHaveBeenCalled();
  }));

  it('should set the error message when a new claim fails to be added', fakeAsync(() => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(asyncError({}));
    spyOn(activeModal, 'close');
    component.addNew();
    tick();
    expect(component.message).toBe('Unable to create a new expense claim');
  }));
});
