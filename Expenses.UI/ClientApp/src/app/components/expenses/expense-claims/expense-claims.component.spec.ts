import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { ExpenseClaimsComponent } from './expense-claims.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AddExpenseDetailsComponent } from '../add-expense-details/add-expense-details.component';
import { ExpenseClaim } from '../models/expense-claim';
import { ExpenseClaimsService } from '../expense-claims.service';
import { HomeComponent } from '../../home/home.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { appRoutes } from '../../../app.routes';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpensesSummary } from '../models/expenses-summary';
import { StoreHelper } from '../../../shared/store/store-helper';
import { Store, InjectableStoreDecorator } from '../../../shared/store/store';
import { ToastModule, Toast, ToastsManager } from 'ng2-toastr';
import { asyncError, asyncData } from '../../../testing/helpers';
import { Router } from '@angular/router';

describe('ExpenseClaimsComponent', () => {
  let component: ExpenseClaimsComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponent>;
  let expenseClaimsService;
  let expenseServiceSpy: jasmine.Spy;

  const claims = new Array<ExpenseClaim>(new ExpenseClaim({ description: 'A Description', id: 1,  dueDateUtc: '20180417' }), new ExpenseClaim());

  const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });

  describe('On Initialisation', () => {
    beforeEach(
      async(() => {
        const expenseClaimsServiceStub = {
          claims(): Observable<ExpensesSummary> {
            return asyncData(summary);
          }
        };

        TestBed.configureTestingModule({
          providers: [
            {
              provide: ExpenseClaimsService,
              useValue: expenseClaimsServiceStub
            },
            {
              provide: AppConfig,
              useValue: {}
            }
          ],
          declarations: [HomeComponent, ExpenseClaimsComponent, PageNotFoundComponent, AddExpenseDetailsComponent],
          imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes), HttpClientTestingModule, NgbModule.forRoot(), ToastModule.forRoot()]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);

      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call the service when initialised', () => {
      expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
      fixture.detectChanges();
      expect(expenseClaimsService.claims).toHaveBeenCalled();
    });
  });

  describe('UI', () => {
    beforeEach(
      async(() => {
        const expenseClaimsServiceStub = {
          claims(): Observable<ExpensesSummary> {
            return asyncData(summary);
          }
        };

        TestBed.configureTestingModule({
          providers: [
            {
              provide: ExpenseClaimsService,
              useValue: expenseClaimsServiceStub
            },
            {
              provide: AppConfig,
              useValue: {}
            }
          ],
          declarations: [HomeComponent, ExpenseClaimsComponent, PageNotFoundComponent, AddExpenseDetailsComponent],
          imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes), HttpClientTestingModule, NgbModule.forRoot(), ToastModule.forRoot()]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = TestBed.get(ExpenseClaimsService);

      component = fixture.componentInstance;
    });

    it(
      'should set the correct header',
      fakeAsync(() => {
        const de = fixture.debugElement.query(By.css('h2'));
        const el = de.nativeElement;

        expect(el.textContent).toBe('All Your Claims');
      })
    );

    it(
      'should contain a the correct list of claims',
      fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const des = fixture.debugElement.queryAll(By.css('a'));
        expect(des.length).toBe(2);
      })
    );

    it(
      'should contain a the correct list of claims',
      fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('a'));
        const el = de.nativeElement;
        expect(el.textContent).toBe('A Description');
      })
    );

    it(
      'should set the correct urls',
      fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();        
        const de = fixture.debugElement.query(By.css('a'));
        const el = de.nativeElement.getAttribute('href');
        expect(el).toEqual('/expenses/1');
      })
    );

    it(
      'should set the summary total claimed',
      fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#totalClaimed'));
        const el = de.nativeElement;
        expect(el.textContent).toContain('200');
      })
    );

    it(
      'should set the corect claim date',
      fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        // const de = fixture.debugElement.query(By.css('tbody tr td'));
        const el = fixture.nativeElement.querySelector('tbody tr td');
        expect(el.textContent).toContain('Apr 17 2018');
      })
    );

    it(
      'should set the summary total paid',
      fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#totalPaid'));
        const el = de.nativeElement;
        expect(el.textContent).toContain('100');
      })
    );
  });

  describe('Sync UI', () => {
    beforeEach(
      async(() => {
        const expenseClaimsServiceStub = {
          claims(): Observable<ExpensesSummary> {
            return asyncData(summary);
          }
        };

        TestBed.configureTestingModule({
          providers: [
            {
              provide: ExpenseClaimsService,
              useValue: expenseClaimsServiceStub
            },
            {
              provide: AppConfig,
              useValue: {}
            }
          ],
          declarations: [HomeComponent, ExpenseClaimsComponent, PageNotFoundComponent, AddExpenseDetailsComponent],
          imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes), HttpClientTestingModule, NgbModule.forRoot(), ToastModule.forRoot()]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);

      component = fixture.componentInstance;
    });

    it('should set the correct header', fakeAsync(() => {
      const de = fixture.debugElement.query(By.css('h2'));
      const el = de.nativeElement;

      expect(el.textContent).toBe('All Your Claims');
    }));

    it('should contain a the correct list of claims', fakeAsync(() => {
      expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const des = fixture.debugElement.queryAll(By.css('a'));
      expect(des.length).toBe(2);
    }));

    it('should contain a the correct list of claims', fakeAsync(() => {
      expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('a'));
      const el = de.nativeElement;
      expect(el.textContent).toBe('A Description');
    }));

    it('should set the correct urls', fakeAsync(() => {
      expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('a'));
      const el = de.nativeElement.getAttribute('href');
      expect(el).toEqual('/expenses/1');
    }));

    it('should set the summary total claimed', fakeAsync(() => {
      expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('#totalClaimed'));
      const el = de.nativeElement;
      expect(el.textContent).toContain('200');
    }));

    it('should set the summary total paid', fakeAsync(() => {
      expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callThrough();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('#totalPaid'));
      const el = de.nativeElement;
      expect(el.textContent).toContain('100');
    }));
  });

  describe('Failing to connect to service on Initialisation', () => {
    let toastrService;

    beforeEach(
      async(() => {
        const expenseClaimsServiceStub = {
          claims(): Observable<ExpensesSummary> {
            throw new Error('error');
          }
        };

        TestBed.configureTestingModule({
          providers: [
            ExpenseClaimsService,
            StoreHelper,
            {
              provide: Store,
              useClass: InjectableStoreDecorator
            },
            {
              provide: AppConfig,
              useValue: {}
            }
          ],
          declarations: [HomeComponent, ExpenseClaimsComponent, PageNotFoundComponent, AddExpenseDetailsComponent],
          imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes), HttpClientTestingModule, NgbModule.forRoot(), ToastModule.forRoot()]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);
      toastrService = fixture.debugElement.injector.get(ToastsManager);

      component = fixture.componentInstance;
    });

    it('should log an error when the service fails (sync)', () => {
      spyOn(expenseClaimsService, 'claims').and.returnValue(Observable.throw({ status: 404 }));
      spyOn(toastrService, 'error');
      fixture.detectChanges();
      expect(toastrService.error).toHaveBeenCalledWith('Unable to get expense claims', 'Error');
    });

    it(
      'should log an error when the service fails',
      fakeAsync(() => {
        //      spyOn(expenseClaimsService, 'claims').and.returnValue(Observable.throw({ status: 404 }));
        spyOn(expenseClaimsService, 'claims').and.returnValue(asyncError({ status: 404 }));
        spyOn(toastrService, 'error');
        fixture.detectChanges();
        tick();
        expect(toastrService.error).toHaveBeenCalledWith('Unable to get expense claims', 'Error');
      })
    );
  });

  describe('Creating a new claim', () => {
    let modalService;
    let toastrService;
    let routeService;

    beforeEach(
      async(() => {
        const expenseClaimsServiceStub = {
          claims(): Observable<ExpensesSummary> {
            return asyncData(summary);
          }
        };

        TestBed.configureTestingModule({
          providers: [
            {
              provide: ExpenseClaimsService,
              useValue: expenseClaimsServiceStub
            },
            {
              provide: AppConfig,
              useValue: {}
            }
          ],
          declarations: [HomeComponent, ExpenseClaimsComponent, PageNotFoundComponent, AddExpenseDetailsComponent],
          imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes), HttpClientTestingModule, NgbModule.forRoot(), ToastModule.forRoot()]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      modalService = fixture.debugElement.injector.get(NgbModal);
      toastrService = fixture.debugElement.injector.get(ToastsManager);
      routeService = fixture.debugElement.injector.get(Router);

      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show the modal', () => {
      spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({}) });
      component.newClaim();
      expect(modalService.open).toHaveBeenCalled();
    });

    xit('should show the toast when the expense claim is added - fails - async', () => {
      spyOn(toastrService, 'success');
      spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({}) });
      component.newClaim();
      expect(toastrService.success).toHaveBeenCalled();
    });

    it(
      'should show the toast when the user creates the claim',
      fakeAsync(() => {
        spyOn(toastrService, 'success');
        spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: true, id: 3 }) });
        component.newClaim();
        tick();
        expect(toastrService.success).toHaveBeenCalled();
      })
    );

    it(
      'should follow the route when the user creates the claim',
      fakeAsync(() => {
        spyOn(toastrService, 'success');
        spyOn(routeService, 'navigate');
        spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: true, id: 3 }) });
        component.newClaim();
        tick();
        expect(routeService.navigate).toHaveBeenCalledWith(['/expenses', 3]);
      })
    );

    it(
      'should not show the toast when the user cancels creating the claim',
      fakeAsync(() => {
        spyOn(toastrService, 'success');
        spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: false }) });
        component.newClaim();
        tick();
        expect(toastrService.success).not.toHaveBeenCalled();
      })
    );
  });
});
