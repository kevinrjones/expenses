import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/authorization/auth-guard.service';
import { ExpenseClaimsComponent } from './components/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from './components/show-expense-details/show-expense-details.component';

export const expensesRoutes: Routes = [
  {
    path: '',
    component: ExpenseClaimsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':id',
    component: ShowExpenseDetailsComponent,
    canActivate: [AuthGuardService]
  }
];
