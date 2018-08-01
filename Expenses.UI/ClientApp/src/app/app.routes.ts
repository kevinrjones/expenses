import { Routes } from '@angular/router';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from './components/expenses/show-expense-details/show-expense-details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthCallbackComponent } from './shared/components/auth-callback/auth-callback.component';
import { AuthGuardService } from './shared/services/authorization/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [{ path: '', component: ExpenseClaimsComponent }, { path: 'expenses/:id', component: ShowExpenseDetailsComponent }]
  },
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  { path: '**', component: PageNotFoundComponent }
];
