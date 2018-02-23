import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseClaimsService } from './expenses-claims.service';

import { ResponseOptions } from '@angular/http';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { ExpenseClaim } from '../../models/expense-claim';
import { AppConfig } from '../../shared/projectConfigShared';

describe('ExpenseClaimsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseClaimsService,
        {
          provide: AppConfig,
          useValue: {
            expensesUrl: "/expenses",
            rootUrl: "/api"
          }
        }],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([ExpenseClaimsService], (service: ExpenseClaimsService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the http service', async(inject([ExpenseClaimsService, HttpTestingController],
    (service: ExpenseClaimsService, backend: HttpTestingController) => {

      service.claims().subscribe();
      backend.expectOne((req: HttpRequest<any>) => {

        return req.url === '/api/expenses'
          && req.method === 'GET'
      }, `GET Claims`);

    })));

  it('should call the http service 1', async(
    inject([ExpenseClaimsService, HttpTestingController], (expenseClaimsService: ExpenseClaimsService, backend: HttpTestingController) => {
      expenseClaimsService.claims().subscribe();

      const req = backend.expectOne({
        url: '/api/expenses',
        method: 'GET'
      });

      expect(req.request.method).toBe("GET");
    })
  ));

  it('should call the http service 2', async(
    inject([ExpenseClaimsService, HttpTestingController], (expenseClaimsService: ExpenseClaimsService, backend: HttpTestingController) => {
      expenseClaimsService.claims().subscribe();

      const req = backend.expectOne({});

      expect(req.request.method).toBe("GET");
      expect(req.request.url).toBe("/api/expenses");
    })
  ));

  it('should return the correct data', async(
    inject([ExpenseClaimsService, HttpTestingController], (expenseClaimsService: ExpenseClaimsService, backend: HttpTestingController) => {
      const data = [
        { description: 'Title1' },
        { description: 'Title2' },
        { description: 'Title3' },
        { description: 'Title4' }
      ];

      expenseClaimsService.claims().subscribe((data: Array<ExpenseClaim>) => {
        expect(data.length).toBe(4)
      });

      backend.expectOne({
        url: '/api/expenses',
        method: 'GET'
      }).flush(data);

    })

  ));


});
