import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseClaimsService } from './expense-claims.service';

import { ResponseOptions } from '@angular/http';
import { HttpRequest, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../../shared/projectConfigShared';
import { NewExpenseClaim } from './models/new-expense-claim';
import { ExpensesSummary } from './models/expenses-summary';
import { StoreHelper } from '../../shared/store/store-helper';
import { Store, InjectableStoreDecorator } from '../../shared/store/store';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

describe('ExpensesClaimsService', () => {
  let service: ExpenseClaimsService;
  let backend: HttpTestingController;
  let store: StoreHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseClaimsService,
        {
          provide: Store,
          useClass: InjectableStoreDecorator
        },
        StoreHelper,
        {
          provide: AppConfig,
          useValue: {
            expensesUrl: '/expenses',
            rootUrl: '/api'
          }
        }
      ],
      imports: [HttpClientTestingModule]
    });

    store = TestBed.get(StoreHelper);
    service = TestBed.get(ExpenseClaimsService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  // prettier-ignore
  it('should be created', inject([ExpenseClaimsService], (service1: ExpenseClaimsService) => {
      expect(service1).toBeTruthy();
    })
  );

  // prettier-ignore
  it('should call the http service to get the data',
      inject([ExpenseClaimsService, HttpTestingController], (service1: ExpenseClaimsService, backend1: HttpTestingController) => {
      service.claims().subscribe();
      backend1.expectOne((req: HttpRequest<any>) => {
        return req.url === '/api/expenses' && req.method === 'GET';
      }, `GET Claims`);
    })
  );

  // prettier-ignore
  it('should call the http service to get the data (sync)',    () => {
      service.claims().subscribe();
      backend.expectOne((req: HttpRequest<any>) => {
        return req.url === '/api/expenses' && req.method === 'GET';
      }, `GET Claims`);
  });

  it('should call the http service 1', () => {
    service.claims().subscribe();

    const req = backend.expectOne({
      url: '/api/expenses',
      method: 'GET'
    });

    expect(req.request.method).toBe('GET');
  });

  it('should call the http service 2', () => {
    service.claims().subscribe();

    const req = backend.expectOne({});

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('/api/expenses');
  });

  it('should return the correct data', () => {
    const data = {
      claims: [{ description: 'Desctiption1' }, { description: 'Desctiption2' }, { description: 'Desctiption3' }, { description: 'Desctiption4' }]
    };

    service.claims().subscribe((summary: ExpensesSummary) => {
      expect(summary.claims.length).toBe(4);
    });

    backend
      .expectOne({
        url: '/api/expenses',
        method: 'GET'
      })
      .flush(data);
  });

  it('should call return an error when the HTTP call fails', () => {
    service.claims().subscribe(
      () => {
        fail('should have failed with the 404 error');
      },
      (error: String) => {
          expect(error).toBe('There was an error. Please report this to technical support.');
      }
    );

    backend
      .expectOne({
        url: '/api/expenses',
        method: 'GET'
      })
      .flush('Invalid', { status: 404, statusText: 'Not Found' });
  });

  it('should call the http service to create a new claim', () => {
    service.newClaim(new NewExpenseClaim()).subscribe();
    backend.expectOne(
      {
        url: '/api/expenses',
        method: 'POST'
      },
      `Create Claim`
    );
  });

  fit('should store the new claim', () => {
    const data = {
      claims: [{ description: 'Desctiption1' }, { description: 'Desctiption2' }, { description: 'Desctiption3' }, { description: 'Desctiption4' }]
    };

    spyOn(store, 'update');
    service.claims().subscribe(d => {
      expect(store.update).toHaveBeenCalled();
    });
    backend.expectOne(
      {
        url: '/api/expenses',
        method: 'GET'
      }).flush(data);

  });


});
