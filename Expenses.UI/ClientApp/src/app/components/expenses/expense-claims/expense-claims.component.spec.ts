import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ExpenseClaimsComponent } from './expense-claims.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';
import { ExpenseClaim } from '../models/expense-claim';
import { ExpenseClaimsService } from '../expenses-claims.service';
import { HomeComponent } from '../../home/home.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { appRoutes } from '../../../app.routes';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpensesSummary } from '../models/expenses-summary';


describe('ExpenseClaimsComponent', () => {
  let component: ExpenseClaimsComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponent>;
  let expenseClaimsService;
  let expenseServiceSpy: jasmine.Spy;

  const claims = new Array<ExpenseClaim>(
    new ExpenseClaim({description: 'A Description', id : 1}),
    new ExpenseClaim());

    const summary = new ExpensesSummary({totalClaimed: 100, totalPaid: 100, claims: claims});

  beforeEach(async(() => {
    const expenseClaimsServiceStub = {
      claims(): Observable<ExpensesSummary> {
        return Observable.of(summary);
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
        }],
      declarations: [
        HomeComponent,
        ExpenseClaimsComponent,
        PageNotFoundComponent,
        ExpenseDetailsComponent],
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseClaimsComponent);

    expenseClaimsService = fixture.debugElement.injector.get(ExpenseClaimsService);
    expenseServiceSpy = spyOn(expenseClaimsService, 'claims')
      .and.callThrough();

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct header', () => {
    const de = fixture.debugElement.query(By.css('h2'));
    const el = de.nativeElement;

    expect(el.textContent).toBe('All Your Claims');
  });

  it('should contain a the correct list of claims', () => {
    const des = fixture.debugElement.queryAll(By.css('a'));
    expect(des.length).toBe(2);
  });

  it('should contain a the correct list of claims', () => {
    const de = fixture.debugElement.query(By.css('a'));
    const el = de.nativeElement;
    expect(el.textContent).toBe('A Description');
  });

  it('should set the correct urls', () => {
    const de = fixture.debugElement.query(By.css('a'));
    const el = de.nativeElement.getAttribute('href');
    expect(el).toEqual('/expenses/1');
  });

  it('should call the service when initialised', () => {
    expect(expenseClaimsService.claims).toHaveBeenCalled();
  });
});
