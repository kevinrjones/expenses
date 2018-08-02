import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { AppConfig } from '../../shared/projectConfigShared';
import { LoggingService } from '../../shared/services/logging.service';
import { ExpensesSummary } from '../models/expenses-summary';
import { NewExpenseClaim } from '../models/new-expense-claim';
import { ExpenseClaimsService } from './expense-claims.service';

describe('ExpensesClaimsService', () => {
  let service: ExpenseClaimsService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseClaimsService,
        {
          provide: AppConfig,
          useValue: {
            expensesUrl: '/expenses',
            apiUrl: '/api',
          }
        },
        {
          provide: LoggingService,
          useValue: jasmine.createSpyObj('logger', ['info', 'error'])
        }
      ],
      imports: [HttpClientTestingModule]
    });

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

  it('should call the http service to create a new claim', () => {
    service.newClaim(new NewExpenseClaim()).subscribe();
    backend.expectOne(
      {
        url: '/api/expenses',
        method: 'POST'
      },
      `Create Claim`
    );
    expect().nothing(); // suppress 'has no expectations' message
  });

  describe('claims', () => {

    it('should call the http service to get the data', inject(
      [ExpenseClaimsService, HttpTestingController],
      (service1: ExpenseClaimsService, backend1: HttpTestingController) => {
        service.claims().subscribe();
        backend1.expectOne((req: HttpRequest<any>) => {
          return req.url === '/api/expenses' && req.method === 'GET';
        }, `GET Claims`);
        expect().nothing(); // suppress 'has no expectations' message
      }
    ));

    // prettier-ignore
    it('should call the http service 1', fakeAsync(() => {
      service.claims().subscribe();
      tick();

      const req = backend.expectOne({
        url: '/api/expenses',
        method: 'GET'
      });

      expect(req.request.method).toBe('GET');
    }));

    // prettier-ignore
    it('should call the http service 2', fakeAsync(() => {
      service.claims().subscribe();
      tick();

      const req = backend.expectOne({});

      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('/api/expenses');
    }));

    it('should return the correct data', fakeAsync(() => {
      const data = {
        claims: [
          { description: 'Desctiption1' },
          { description: 'Desctiption2' },
          { description: 'Desctiption3' },
          { description: 'Desctiption4' }
        ]
      };

      service.claims().subscribe((summary: ExpensesSummary) => {
        expect(summary.claims.length).toBe(4);
      });

      tick();

      backend
        .expectOne({
          url: '/api/expenses',
          method: 'GET'
        })
        .flush(data);
    }));

    it('should return an error when the HTTP call fails', fakeAsync(() => {
      service.claims().subscribe(
        () => {
          fail('should have failed with the 404 error');
        },
        (error: String) => {
          expect(error).toBe('There was an error. Please report this to technical support.');
        }
      );

      tick();

      backend
        .expectOne({
          url: '/api/expenses',
          method: 'GET'
        })
        .flush('Invalid', { status: 404, statusText: 'Not Found' });
    }));
  });

  describe('claim', () => {

    it('should call the http service to get the data', inject(
      [ExpenseClaimsService, HttpTestingController],
      (service1: ExpenseClaimsService, backend1: HttpTestingController) => {
        service1.claim(1).subscribe();
        backend1.expectOne((req: HttpRequest<any>) => {
          return req.url === '/api/expenses/1' && req.method === 'GET';
        }, `GET Claim`).flush( { description: 'Description1' });
        expect().nothing(); // suppress 'has no expectations' message
      }
    ));


  });
});
