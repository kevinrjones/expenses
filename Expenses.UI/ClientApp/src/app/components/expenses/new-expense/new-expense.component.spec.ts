import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { NewExpenseComponent } from './new-expense.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseClaimsService } from '../expense-claims.service';
import { AppConfig } from '../../../shared/projectConfigShared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule, ToastsManager } from 'ng2-toastr';
import { StoreHelper } from '../../../shared/store/store-helper';
import { InjectableStoreDecorator, Store } from '../../../shared/store/store';
import { ViewContainerRef } from '@angular/core';
import { asyncData } from '../../../testing/helpers';

describe('NewExpenseComponent', () => {
  let component: NewExpenseComponent;
  let fixture: ComponentFixture<NewExpenseComponent>;
  let expenseClaimsService: ExpenseClaimsService;
  let activeModal: NgbActiveModal;
  let toastrService: ToastsManager;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpenseComponent ],
      providers: [
        NgbActiveModal,
        ExpenseClaimsService,
        {
          provide: Store,
          useClass: InjectableStoreDecorator
        },
        StoreHelper,
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
        ToastModule.forRoot()
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
    toastrService = TestBed.get(ToastsManager);
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
});
