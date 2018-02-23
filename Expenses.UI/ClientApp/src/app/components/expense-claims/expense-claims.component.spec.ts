import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ExpenseClaimsComponent } from './expense-claims.component';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { HomeComponent } from '../../components/home/home.component';
import { appRoutes } from '../../app.routes'
import { AppConfig } from '../../shared/projectConfigShared';
import { ExpenseClaimsService } from './expenses-claims.service';
import { ExpenseClaim } from '../../models/expense-claim';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('ExpenseClaimsComponentComponent', () => {
  let component: ExpenseClaimsComponent;
  let fixture: ComponentFixture<ExpenseClaimsComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let expenseClaimsService;
  let expenseServiceSpy: jasmine.Spy;

  beforeEach(async(() => {
    let expenseClaimsServiceStub = {
      claims(): Observable<Array<ExpenseClaim>> {
        return Observable.of(new Array<ExpenseClaim>(
          new ExpenseClaim({description: 'A Description'}), 
          new ExpenseClaim()))
      }
    }

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
        PageNotFoundComponent],
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
    de = fixture.debugElement.query(By.css('h2'))
    el = de.nativeElement;

    expect(el.textContent).toBe('All Your Claims');
  });
  
  it('should contain a the correct list of claims', () => {
    let des = fixture.debugElement.queryAll(By.css('li'))
    
    expect(des.length).toBe(2);
  });

  it('should contain a the correct list of claims', () => {
    let de = fixture.debugElement.query(By.css('li'))
    let el = de.nativeElement
    expect(el.textContent).toBe('A Description');
  });
  

  it('should call the service when initialised', () => {
    expect(expenseClaimsService.claims).toHaveBeenCalled();
  });
});
