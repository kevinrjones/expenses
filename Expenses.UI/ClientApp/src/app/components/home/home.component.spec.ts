import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../app.routes';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { AddExpenseDetailsComponent } from '../expenses/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from '../expenses/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from '../expenses/show-expense-details/show-expense-details.component';
import { HomeComponent } from './home.component';




describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,
        ShowExpenseDetailsComponent,
        PageNotFoundComponent,
        ExpenseClaimsComponent,
        AddExpenseDetailsComponent],
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
