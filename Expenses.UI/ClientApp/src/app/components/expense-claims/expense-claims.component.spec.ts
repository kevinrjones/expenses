import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ExpenseClaimsComponent } from './expense-claims.component';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { HomeComponent } from '../../components/home/home.component';
import { appRoutes } from '../../app.routes';
import { AppConfig } from '../../shared/projectConfigShared';
import { ExpenseClaimsService } from './expenses-claims.service';
import { ExpenseClaim } from '../../models/expense-claim';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';


describe('ExpenseClaimsComponent', () => {
  let component: ExpenseClaimsComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponent>;
  let expenseClaimsService;
  let expenseServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    const expenseClaimsServiceStub = {
      claims(): Observable<Array<ExpenseClaim>> {
        return Observable.of(new Array<ExpenseClaim>(
          new ExpenseClaim({description: 'A Description', id : 1}),
          new ExpenseClaim()));
      }
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ExpenseClaimsService,
          useValue: expenseClaimsServiceStub
        },
        {
          provide: 'app.config',
          useValue: {}
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
    const des = fixture.debugElement.queryAll(By.css('li'));
    expect(des.length).toBe(2);
  });

  it('should contain a the correct list of claims', () => {
    const de = fixture.debugElement.query(By.css('li'));
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
