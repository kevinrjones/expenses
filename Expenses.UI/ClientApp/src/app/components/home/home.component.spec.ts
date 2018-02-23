import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { HomeComponent } from './home.component';

import { appRoutes } from '../../app.routes'
import { AppConfig } from '../../shared/projectConfigShared';
import { ExpenseClaimsComponent } from '../expenses/expense-claims/expense-claims.component';
import { ExpenseDetailsComponent } from '../expenses/expense-details/expense-details.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,
        PageNotFoundComponent,
        ExpenseClaimsComponent,
        ExpenseDetailsComponent],
      imports: [RouterTestingModule.withRoutes(appRoutes)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
