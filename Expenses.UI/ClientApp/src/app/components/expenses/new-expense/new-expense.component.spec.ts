import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { NewExpenseComponent } from './new-expense.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseClaimsService } from '../expenses-claims.service';
import { AppConfig } from '../../../shared/projectConfigShared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule, ToastsManager } from 'ng2-toastr';
import { StoreHelper } from '../../../shared/store/store-helper';
import { InjectableStoreDecorator, Store } from '../../../shared/store/store';

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

    expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);
    activeModal = fixture.debugElement.injector.get(NgbActiveModal);
    toastrService = fixture.debugElement.injector.get(ToastsManager);
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

  it('should add the new claim when asked', () => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(Observable.of({}));
    component.addNew();
    expect(expenseClaimsService.newClaim).toHaveBeenCalled();
  });

  it('should add close the active modal when a new claim is sucesfully added', () => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(Observable.of({}));
    spyOn(activeModal, 'close');
    component.addNew();
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should how a succesful toast when a new claim is sucesfully added', () => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(Observable.of({}));
    spyOn(toastrService, 'success');
    component.addNew();
    expect(toastrService.success).toHaveBeenCalled();
  });

  it('should not add close the active modal when a new claim is unsucesfully added', () => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(Observable.throw({}));
    spyOn(activeModal, 'close');
    component.addNew();
    expect(activeModal.close).not.toHaveBeenCalled();
  });

  it('should how a succesful toast when a new claim is sucesfully added', () => {
    spyOn(expenseClaimsService, 'newClaim').and.returnValue(Observable.throw({}));
    spyOn(toastrService, 'error');
    component.addNew();
    expect(toastrService.error).toHaveBeenCalled();
  });
});
