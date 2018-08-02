import { Routes } from '@angular/router';
import { ExpenseClaimsComponent } from './expenses/components/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from './expenses/components/show-expense-details/show-expense-details.component';
import { HomeComponent } from './home/components/home/home.component';
import { AuthCallbackComponent } from './shared/components/auth-callback/auth-callback.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
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
