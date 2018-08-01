import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subject } from 'rxjs/Subject';
import { appRoutes } from '../../../app.routes';
import { AuthCallbackComponent } from '../../../shared/components/auth-callback/auth-callback.component';
import { ErrorState } from '../../../shared/ErrorState';
import { AppConfig } from '../../../shared/projectConfigShared';
import { AuthenticationService } from '../../../shared/services/authorization/authentication.service';
import { LoggingService } from '../../../shared/services/logging.service';
import { IAppState } from '../../../store';
import { asyncData } from '../../../testing/helpers';
import { HomeComponent } from '../../home/home.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { AddExpenseDetailsComponent } from '../add-expense-details/add-expense-details.component';
import { ExpenseActions } from '../expense-actions';
import { ExpenseClaimsService } from '../expense-claims.service';
import { ExpenseClaim } from '../models/expense-claim';
import { ExpensesSummary } from '../models/expenses-summary';
import { ShowExpenseDetailsComponent } from '../show-expense-details/show-expense-details.component';
import { ExpenseClaimsComponent } from './expense-claims.component';

describe('ExpenseClaimsComponent', () => {
  let component: ExpenseClaimsComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponent>;
  let expenseClaimsService;
  let expenseServiceSpy: jasmine.Spy;

  const claims = new Array<ExpenseClaim>(
    new ExpenseClaim({ description: 'A Description', id: 1, dueDateUtc: '20180417' }),
    new ExpenseClaim()
  );

  const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });

  describe('On Initialisation', () => {
    beforeEach(async(() => {
      MockNgRedux.reset();
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
          },
          ExpenseActions
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          ToastrModule.forRoot(),
          NgReduxTestingModule
        ]
      }).compileComponents();
    }));

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
    let storeStub: Subject<ExpensesSummary>;

    beforeEach(async(() => {
      MockNgRedux.reset();

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
          },
          ExpenseActions
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          ToastrModule.forRoot(),
          NgReduxTestingModule
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = TestBed.get(ExpenseClaimsService);

      component = fixture.componentInstance;

      storeStub = MockNgRedux.getSelectorStub<IAppState, ExpensesSummary>('expenseClaims');
    });

    // prettier-ignore
    it('should set the correct header', fakeAsync(() => {
        const de = fixture.debugElement.query(By.css('h2'));
        const el = de.nativeElement;

        expect(el.textContent).toBe('All Your Claims');
      })
    );

    // prettier-ignore
    it('should contain the correct list of claims', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const des = fixture.debugElement.queryAll(By.css('a'));
        expect(des.length).toBe(2);
      })
    );

    // prettier-ignore
    it('should contain the correct title in the claim', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('a'));
        const el = de.nativeElement;
        expect(el.textContent).toBe('A Description');
      })
    );

    // prettier-ignore
    it('should set the correct urls', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('a'));
        const el = de.nativeElement.getAttribute('href');
        expect(el).toEqual('/expenses/1');
      })
    );

    // prettier-ignore
    it('should set the summary total claimed', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#totalClaimed'));
        const el = de.nativeElement;
        expect(el.textContent).toContain('200');
      })
    );

    // prettier-ignore
    it('should set the corect claim date', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        // const de = fixture.debugElement.query(By.css('tbody tr td'));
        const el = fixture.nativeElement.querySelector('tbody tr td');
        expect(el.textContent).toContain('Apr 17 2018');
      })
    );

    // prettier-ignore
    it('should set the summary total paid', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#totalPaid'));
        const el = de.nativeElement;
        expect(el.textContent).toContain('100');
      })
    );
  });

  describe('Sync UI', () => {
    let storeStub: Subject<ExpensesSummary>;

    beforeEach(async(() => {
      MockNgRedux.reset();
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
          },
          ExpenseActions
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          ToastrModule.forRoot(),
          NgReduxTestingModule
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);

      component = fixture.componentInstance;

      storeStub = MockNgRedux.getSelectorStub<IAppState, ExpensesSummary>('expenseClaims');
    });

    // prettier-ignore
    it('should set the correct header', fakeAsync(() => {
        const de = fixture.debugElement.query(By.css('h2'));
        const el = de.nativeElement;

        expect(el.textContent).toBe('All Your Claims');
      })
    );

    // prettier-ignore
    it('should contain a the correct list of claims', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const des = fixture.debugElement.queryAll(By.css('a'));
        expect(des.length).toBe(2);
      })
    );

    // prettier-ignore
    it('should contain a the correct list of claims', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('a'));
        const el = de.nativeElement;
        expect(el.textContent).toBe('A Description');
      })
    );

    // prettier-ignore
    it('should set the correct urls', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('a'));
        const el = de.nativeElement.getAttribute('href');
        expect(el).toEqual('/expenses/1');
      })
    );

    // prettier-ignore
    it('should set the summary total claimed', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#totalClaimed'));
        const el = de.nativeElement;
        expect(el.textContent).toContain('200');
      })
    );

    // prettier-ignore
    it('should set the summary total paid', fakeAsync(() => {
        expenseServiceSpy = spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(summary);
          return asyncData(summary);
        });
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('#totalPaid'));
        const el = de.nativeElement;
        expect(el.textContent).toContain('100');
      })
    );
  });

  describe('Failing to connect to service on Initialisation', () => {
    let toastrService;

    let storeStub: Subject<ErrorState>;
    beforeEach(async(() => {
      MockNgRedux.reset();

      TestBed.configureTestingModule({
        providers: [
          ExpenseClaimsService,
          {
            provide: AppConfig,
            useValue: {}
          },
          ExpenseActions,
          {
            provide: LoggingService,
            useValue: jasmine.createSpyObj('logger', ['info', 'error'])
          }
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          ToastrModule.forRoot(),
          NgReduxTestingModule
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);
      toastrService = fixture.debugElement.injector.get(ToastrService);

      component = fixture.componentInstance;
      storeStub = MockNgRedux.getSelectorStub<IAppState, ErrorState>('error');
    });

    it('should log an error when the service fails (sync)', () => {
      spyOn(expenseClaimsService, 'claims').and.callFake(() => {
        storeStub.next(new ErrorState({ message: 'Unable to get expense claims' }));
        return ErrorObservable.create('An error');
      });
      spyOn(toastrService, 'error');
      fixture.detectChanges();
      fixture.detectChanges();
      expect(toastrService.error).toHaveBeenCalledWith('Unable to get expense claims', 'Error');
    });

    // prettier-ignore
    it('should log an error when the service fails', fakeAsync(() => {
        spyOn(expenseClaimsService, 'claims').and.callFake(() => {
          storeStub.next(new ErrorState({message: 'Unable to get expense claims'}));
          return ErrorObservable.create('An error');
        });
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

    beforeEach(async(() => {
      MockNgRedux.reset();
      const expenseClaimsServiceStub = {
        claims(): Observable<ExpensesSummary> {
          return asyncData(summary);
        }
      };

      const authServiceStub = {
        isLoggedIn(): Observable<boolean> {
          return asyncData(true);
        }
      };

      TestBed.configureTestingModule({
        providers: [
          {
            provide: ExpenseClaimsService,
            useValue: expenseClaimsServiceStub
          },
          {
            provide: AuthenticationService,
            useValue: authServiceStub
          },
          {
            provide: AppConfig,
            useValue: {}
          },
          ExpenseActions
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          ToastrModule.forRoot(),
          NgReduxTestingModule
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      modalService = fixture.debugElement.injector.get(NgbModal);
      toastrService = fixture.debugElement.injector.get(ToastrService);
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

    // prettier-ignore
    it('should show the toast when the user creates the claim', fakeAsync(() => {
        spyOn(toastrService, 'success');
        spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: true, id: 3 }) });
        component.newClaim();
        tick();
        expect(toastrService.success).toHaveBeenCalled();
      })
    );

    // prettier-ignore
    it('should follow the route when the user creates the claim', fakeAsync(() => {
        spyOn(toastrService, 'success');
        spyOn(routeService, 'navigate');
        spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: true, id: 3 }) });
        component.newClaim();
        tick();
        expect(routeService.navigate).toHaveBeenCalledWith(['/expenses', 3]);
      })
    );

    // prettier-ignore
    it('should not show the toast when the user cancels creating the claim', fakeAsync(() => {
        spyOn(toastrService, 'success');
        spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: false }) });
        component.newClaim();
        tick();
        expect(toastrService.success).not.toHaveBeenCalled();
      })
    );
  });
});
