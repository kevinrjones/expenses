import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseClaimsService } from './expenses-claims.service';

import { ResponseOptions } from '@angular/http';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../shared/projectConfigShared';
import { ExpenseClaim } from './models/expense-claim';
import { ExpensesSummary } from './models/expenses-summary';
import { StoreHelper } from '../../shared/store/store-helper';
import { Store, InjectableStoreDecorator } from '../../shared/store/store';

describe('ExpenseClaimsService', () => {
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
  });

  afterEach(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.verify();
    })
  );

  // prettier-ignore
  it('should be created', inject([ExpenseClaimsService], (service: ExpenseClaimsService) => {
      expect(service).toBeTruthy();
    })
  );

  // prettier-ignore
  it('should call the http service to get the data', async(
      inject([ExpenseClaimsService, HttpTestingController], (service: ExpenseClaimsService, backend: HttpTestingController) => {
        service.claims().subscribe();
        backend.expectOne((req: HttpRequest<any>) => {
          return req.url === '/api/expenses' && req.method === 'GET';
        }, `GET Claims`);
      })
    )
  );

  // prettier-ignore
  it('should call the http service 1', async(
      inject([ExpenseClaimsService, HttpTestingController], (expenseClaimsService: ExpenseClaimsService, backend: HttpTestingController) => {
        expenseClaimsService.claims().subscribe();

        const req = backend.expectOne({
          url: '/api/expenses',
          method: 'GET'
        });

        expect(req.request.method).toBe('GET');
      })
    )
  );

  // prettier-ignore
  it('should call the http service 2', async(
      inject([ExpenseClaimsService, HttpTestingController], (expenseClaimsService: ExpenseClaimsService, backend: HttpTestingController) => {
        expenseClaimsService.claims().subscribe();

        const req = backend.expectOne({});

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe('/api/expenses');
      })
    )
  );

  // prettier-ignore
  it('should return the correct data', async(
      inject([ExpenseClaimsService, HttpTestingController], (expenseClaimsService: ExpenseClaimsService, backend: HttpTestingController) => {
        const data = {
          claims: [{ description: 'Desctiption1' }, { description: 'Desctiption2' }, { description: 'Desctiption3' }, { description: 'Desctiption4' }]
        };

        expenseClaimsService.claims().subscribe((summary: ExpensesSummary) => {
          expect(summary.claims.length).toBe(4);
        });

        backend
          .expectOne({
            url: '/api/expenses',
            method: 'GET'
          })
          .flush(data);
      })
    )
  );

  // prettier-ignore
  it('should call the http service to create a new claim', async(
      inject([ExpenseClaimsService, HttpTestingController], (service: ExpenseClaimsService, backend: HttpTestingController) => {
        service.newClaim(new ExpenseClaim()).subscribe();
        backend.expectOne(
          {
            url: '/api/expenses',
            method: 'POST'
          },
          `Create Claim`
        );
      })
    )
  );
});
