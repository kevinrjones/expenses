import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddExpenseDetailsComponent } from '../../../expenses/components/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from '../../../expenses/components/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from '../../../expenses/components/show-expense-details/show-expense-details.component';
import { appRoutes } from '../../../router/app.routes';
import { AuthCallbackComponent } from '../../../shared/components/auth-callback/auth-callback.component';
import { PageNotFoundComponent } from '../../../shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './home.component';




describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ShowExpenseDetailsComponent,
        PageNotFoundComponent,
        ExpenseClaimsComponent,
        AddExpenseDetailsComponent,
        AuthCallbackComponent
      ],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes)
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
