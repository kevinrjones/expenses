import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { AddExpenseDetailsComponent } from './components/expenses/add-expense-details/add-expense-details.component';
import { ExpenseClaimFormComponent } from './components/expenses/expense-claim-form/expense-claim-form.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ExpenseClaimsComponent },
      { path: 'expenseform', component: ExpenseClaimFormComponent },
      { path: 'expenses/:id', component: AddExpenseDetailsComponent }
    ]
  },
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
