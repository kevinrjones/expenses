import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { asyncData, MockStore, provideMockStore } from '../../../../testing/helpers';
import { AuthCallbackComponent } from '../../../authentication/components/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from '../../../authentication/components/signout-callback/signout-callback.component';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { HomeComponent } from '../../../home/components/home/home.component';
import { appRoutes } from '../../../router/app.routes';
import { PageNotFoundComponent } from '../../../shared/components/page-not-found/page-not-found.component';
import { AppConfig } from '../../../shared/projectConfigShared';
import { LoggingService } from '../../../shared/services/logging.service';
import { ExpenseClaim } from '../../models/expense-claim';
import { ExpensesSummary } from '../../models/expenses-summary';
import { State } from '../../state/expenses.reducer';
import { AddExpenseDetailsComponent } from '../add-expense-details/add-expense-details.component';
import { ShowExpenseDetailsComponent } from '../show-expense-details/show-expense-details.component';
import { ExpenseClaimsComponent } from './expense-claims.component';

describe('ExpenseClaimsComponent', () => {
  let component: ExpenseClaimsComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponent>;

  const claims = new Array<ExpenseClaim>(
    new ExpenseClaim({ description: 'A Description', id: 1, dueDateUtc: '20180417' }),
    new ExpenseClaim()
  );

  const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });

  describe('On Initialisation', () => {

    let store: MockStore<State>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppConfig,
            useValue: {}
          },
          provideMockStore()
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent,
          SignoutCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          StoreModule.forRoot({}),
          ToastrModule.forRoot()
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);

      component = fixture.componentInstance;
      store = TestBed.get(Store);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch the RequestAllExpenses action', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  describe('UI', () => {
    let store: MockStore<State>;

    beforeEach(async(() => {
      const expenseClaimsServiceStub = {
        claims(): Observable<ExpensesSummary> {
          return asyncData(summary);
        }
      };

      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppConfig,
            useValue: {}
          },
          provideMockStore()
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent,
          SignoutCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          StoreModule.forRoot({}),
          ToastrModule.forRoot()
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);
      component = fixture.componentInstance;
      store = TestBed.get(Store);
    });

    it('should set the correct header', fakeAsync(() => {
      const de = fixture.debugElement.query(By.css('h2'));
      const el = de.nativeElement;

      expect(el.textContent).toBe('All Your Claims');
    }));

    it('should contain the correct list of claims', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const des = fixture.debugElement.queryAll(By.css('a'));
      expect(des.length).toBe(2);
    }));

    it('should contain the correct title in the claim', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('a'));
      const el = de.nativeElement;
      expect(el.textContent).toBe('A Description');
    }));

    it('should set the correct urls', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('a'));
      const el = de.nativeElement.getAttribute('href');
      expect(el).toEqual('/expenses/1');
    }));

    it('should set the summary total claimed', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('#totalClaimed'));
      const el = de.nativeElement;
      expect(el.textContent).toContain('200');
    }));

    it('should set the corect claim date', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      // const de = fixture.debugElement.query(By.css('tbody tr td'));
      const el = fixture.nativeElement.querySelector('tbody tr td');
      expect(el.textContent).toContain('Apr 17 2018');
    }));

    it('should set the summary total paid', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('#totalPaid'));
      const el = de.nativeElement;
      expect(el.textContent).toContain('100');
    }));
  });

  describe('Sync UI', () => {
    let store: MockStore<State>;

    beforeEach(async(() => {
      const expenseClaimsServiceStub = {
        claims(): Observable<ExpensesSummary> {
          return asyncData(summary);
        }
      };

      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppConfig,
            useValue: {}
          },
          provideMockStore()
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent,
          SignoutCallbackComponent
        ],
        imports: [
          StoreModule.forRoot({}),
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          ToastrModule.forRoot()
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);
      component = fixture.componentInstance;
      store = TestBed.get(Store);
    });

    it('should set the correct header', fakeAsync(() => {
      const de = fixture.debugElement.query(By.css('h2'));
      const el = de.nativeElement;

      expect(el.textContent).toBe('All Your Claims');
    }));

    it('should contain a the correct list of claims', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const des = fixture.debugElement.queryAll(By.css('a'));
      expect(des.length).toBe(2);
    }));

    it('should contain a the correct list of claims', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('a'));
      const el = de.nativeElement;
      expect(el.textContent).toBe('A Description');
    }));

    it('should set the correct urls', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('a'));
      const el = de.nativeElement.getAttribute('href');
      expect(el).toEqual('/expenses/1');
    }));

    it('should set the summary total claimed', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('#totalClaimed'));
      const el = de.nativeElement;
      expect(el.textContent).toContain('200');
    }));

    it('should set the summary total paid', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
      tick();
      const de = fixture.debugElement.query(By.css('#totalPaid'));
      const el = de.nativeElement;
      expect(el.textContent).toContain('100');
    }));
  });

  describe('Failing to connect to service on Initialisation', () => {
    let toastrService;
    let store: MockStore<State>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppConfig,
            useValue: {}
          },
          {
            provide: LoggingService,
            useValue: jasmine.createSpyObj('logger', ['info', 'error'])
          },
          provideMockStore()
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent,
          SignoutCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(appRoutes),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          StoreModule.forRoot({}),
          ToastrModule.forRoot()
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);
      toastrService = fixture.debugElement.injector.get(ToastrService);
      component = fixture.componentInstance;
      store = TestBed.get(Store);
    });

    it('should log an error when the service fails (sync)', () => {
      store.setState({
        expenses: {
          expensesSummary: new ExpensesSummary(),
          error: 'Unable to get expense claims'
        }
      });
      spyOn(toastrService, 'error');
      fixture.detectChanges();
      fixture.detectChanges();
      expect(toastrService.error).toHaveBeenCalledWith('Unable to get expense claims', 'Error');
    });

    it('should log an error when the service fails', fakeAsync(() => {
      store.setState({
        expenses: {
          expensesSummary: new ExpensesSummary(),
          error: 'Unable to get expense claims'
        }
      });
      spyOn(toastrService, 'error');
      fixture.detectChanges();
      tick();
      expect(toastrService.error).toHaveBeenCalledWith('Unable to get expense claims', 'Error');
    }));
  });

  describe('Creating a new claim', () => {
    let modalService;
    let toastrService;
    let routeService;
    let store: MockStore<State>;

    beforeEach(async(() => {
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
            provide: AuthenticationService,
            useValue: authServiceStub
          },
          {
            provide: AppConfig,
            useValue: {}
          },
          provideMockStore()
        ],
        declarations: [
          ShowExpenseDetailsComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          PageNotFoundComponent,
          AddExpenseDetailsComponent,
          AuthCallbackComponent,
          SignoutCallbackComponent
        ],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            {
              path: 'expenses',
              component: ExpenseClaimsComponent
            },
            {
              path: 'expenses/:id',
              component: ShowExpenseDetailsComponent
            }
          ]),
          HttpClientTestingModule,
          NgbModule.forRoot(),
          StoreModule.forRoot({}),
          ToastrModule.forRoot()
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExpenseClaimsComponent);
      modalService = fixture.debugElement.injector.get(NgbModal);
      toastrService = fixture.debugElement.injector.get(ToastrService);
      routeService = fixture.debugElement.injector.get(Router);
      store = TestBed.get(Store);

      component = fixture.componentInstance;
      store.setState({
        expenses: {
          expensesSummary: summary,
          error: ''
        }
      });
      fixture.detectChanges();
    });

    it('should show the modal', fakeAsync(() => {
      spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({}) });
      tick();
      component.newClaim();
      expect(modalService.open).toHaveBeenCalled();
    }));

    it('should show the toast when the user creates the claim', fakeAsync(() => {
      spyOn(toastrService, 'success');
      spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: true, id: 3 }) });
      component.newClaim();
      tick();
      expect(toastrService.success).toHaveBeenCalled();
    }));

    it('should follow the route when the user creates the claim', fakeAsync(() => {
      spyOn(toastrService, 'success');
      spyOn(routeService, 'navigate');
      spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: true, id: 3 }) });
      component.newClaim();
      tick();
      expect(routeService.navigate).toHaveBeenCalledWith(['/expenses', 3]);
    }));

    it('should not show the toast when the user cancels creating the claim', fakeAsync(() => {
      spyOn(toastrService, 'success');
      spyOn(modalService, 'open').and.returnValue({ result: Promise.resolve({ save: false }) });
      component.newClaim();
      tick();
      expect(toastrService.success).not.toHaveBeenCalled();
    }));
  });
});
